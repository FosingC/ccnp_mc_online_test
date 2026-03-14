import fitz  # PyMuPDF
import pandas as pd
import re
import os

# --- 设置 ---
pdf_path = "300-410 (685)MC.pdf"
output_csv = "ccnp_data.csv"
image_folder = "ccnp_images"
MAX_PAGE = 364  # 365页以后忽略（1开始到364页处理）

if not os.path.exists(image_folder):
    os.makedirs(image_folder)

def extract_data_v7(pdf_path):
    doc = fitz.open(pdf_path)
    
    questions_db = {}
    questions_order = []

    # 正则表达式模式
    q_pattern = re.compile(r"^(Question\s+\d+|Q\.?\s*\d+)", re.IGNORECASE)
    ans_pattern = re.compile(r"^(Correct Answer|Answer|Correct)\s*[:\.]?\s*([A-F, ]+)", re.IGNORECASE)
    
    current_q_id = None
    
    print(f"Starting extraction v7 (Pages 1-{MAX_PAGE} only)...")

    # 页码限制循环
    for page_num, page in enumerate(doc):
        # 页码检查 (0-indexed 所以 page_num + 1 进行比较)
        if (page_num + 1) > MAX_PAGE:
            print(f"Reached page limit ({MAX_PAGE}). Stopping extraction.")
            break

        # ---------------------------------------------------------
        # 1. 页面内的所有元素（文本、图片）按坐标获取
        # ---------------------------------------------------------
        elements = []

        # 文本块
        blocks = page.get_text("blocks")
        for b in blocks:
            text = b[4].strip()
            if not text: continue
            elements.append({
                "type": "text",
                "y0": b[1],
                "y1": b[3],
                "text": text,
                "page": page_num + 1
            })

        # 画像
        images = page.get_images(full=True)
        for img_index, img in enumerate(images):
            xref = img[0]
            rects = page.get_image_rects(xref)
            if not rects: continue
            
            image_filename = f"p{page_num+1}_img{img_index}.png"
            
            # 画像保存
            if not os.path.exists(os.path.join(image_folder, image_filename)):
                base_image = doc.extract_image(xref)
                with open(os.path.join(image_folder, image_filename), "wb") as f:
                    f.write(base_image["image"])
            
            for rect in rects:
                elements.append({
                    "type": "image",
                    "y0": rect.y0,
                    "y1": rect.y1,
                    "filename": image_filename,
                    "page": page_num + 1
                })

        # ---------------------------------------------------------
        # 2. Y坐标顺（上到下）完全排序
        # ---------------------------------------------------------
        elements.sort(key=lambda x: x["y0"])

        # ---------------------------------------------------------
        # 3. 顺次处理
        # ---------------------------------------------------------
        for i, el in enumerate(elements):
            
            if el["type"] == "text":
                lines = el["text"].split('\n')
                first_line = lines[0].strip()

                # [A] QUESTION头部检测
                if q_pattern.match(first_line):
                    match = q_pattern.match(first_line)
                    new_q_id = match.group(0).upper()
                    
                    if new_q_id not in questions_db:
                        questions_db[new_q_id] = {
                            "id": new_q_id,
                            "question": el["text"] + "\n",
                            "options": [],
                            "answer": "",
                            "images": [],
                            "page": page_num + 1
                        }
                        questions_order.append(new_q_id)
                    
                    current_q_id = new_q_id
                
                # [B] Answer検出
                elif ans_pattern.match(first_line) and current_q_id:
                    match = ans_pattern.match(first_line)
                    if not questions_db[current_q_id]["answer"]:
                        questions_db[current_q_id]["answer"] = match.group(2).strip()

                # [C] 选项检测
                elif re.match(r"^[A-F]\.", first_line) and current_q_id:
                    questions_db[current_q_id]["options"].append(el["text"])

                # [D] 其他文本
                elif current_q_id:
                    if not questions_db[current_q_id]["answer"]:
                        if questions_db[current_q_id]["question"].strip() != el["text"].strip():
                            questions_db[current_q_id]["question"] += "\n" + el["text"]

            elif el["type"] == "image":
                target_id = current_q_id

                # 先读检查（下一个问题的头部图像是否存在）
                for k in range(i + 1, len(elements)):
                    next_el = elements[k]
                    if next_el["y0"] - el["y1"] > 200: # 距离限制
                        break
                    if next_el["type"] == "text":
                        next_lines = next_el["text"].split('\n')
                        if q_pattern.match(next_lines[0].strip()):
                            future_q_id = q_pattern.match(next_lines[0].strip()).group(0).upper()
                            if future_q_id not in questions_db:
                                questions_db[future_q_id] = {
                                    "id": future_q_id,
                                    "question": "",
                                    "options": [],
                                    "answer": "",
                                    "images": [],
                                    "page": page_num + 1
                                }
                                questions_order.append(future_q_id)
                            target_id = future_q_id
                        break

                if target_id:
                    if el["filename"] not in questions_db[target_id]["images"]:
                        questions_db[target_id]["images"].append(el["filename"])
                else:
                    # フォールバック（前の問題の続き）
                    if len(questions_order) > 0:
                        last_q_id = questions_order[-1]
                        if el["filename"] not in questions_db[last_q_id]["images"]:
                            questions_db[last_q_id]["images"].append(el["filename"])

    # ---------------------------------------------------------
    # 4. CSV写出
    # ---------------------------------------------------------
    output_data = []
    for q_id in questions_order:
        item = questions_db[q_id]
        output_data.append({
            "id": item["id"],
            "question": item["question"].strip(),
            "options": "\n".join(item["options"]),
            "answer": item["answer"],
            "images": ",".join(item["images"]),
            "page": item["page"]
        })
    
    df = pd.DataFrame(output_data)
    if not df.empty:
        df['id_num'] = df['id'].str.extract(r'(\d+)').astype(float)
        df = df.sort_values('id_num')
    
    df.to_csv(output_csv, index=False)
    print(f"Extraction v7 Complete. Processed pages 1-{MAX_PAGE}. Saved {len(df)} questions to {output_csv}")

if __name__ == "__main__":
    extract_data_v7(pdf_path)
