import streamlit as st
import pandas as pd
import os
import random
import json
import re

# --- 设置 ---
st.set_page_config(page_title="CCNP 学习应用 v11", layout="wide")
CSV_FILE = "ccnp_data.csv"
IMG_FOLDER = "ccnp_images"
HISTORY_FILE = "flagged_questions.json"

# --- 数据加载函数 ---
@st.cache_data
def load_data():
    if not os.path.exists(CSV_FILE):
        return None
    try:
        df = pd.read_csv(CSV_FILE)
        # 将题号转换为数值（使用 fillna 避免错误）
        df['id_num'] = df['id'].astype(str).str.extract(r'(\d+)').fillna(0).astype(int)
        df = df.sort_values('id_num').reset_index(drop=True)
        return df
    except Exception as e:
        st.error(f"数据读取出错：{e}")
        return None

# --- 学习记录管理 ---
def load_history():
    """从文件加载学习记录"""
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
                # 确保数据结构完整
                if "flagged" not in data:
                    data["flagged"] = []
                if "progress" not in data:
                    data["progress"] = None
                return data
            except:
                return {"flagged": [], "progress": None}
    return {"flagged": [], "progress": None}

def save_history(history):
    """保存学习记录到文件"""
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

def save_progress():
    """保存当前学习进度到文件"""
    if st.session_state.history["progress"] is not None:
        st.session_state.history["progress"]["current_index"] = st.session_state.current_index
        save_history(st.session_state.history)

# --- 初始化 ---
if 'history' not in st.session_state:
    st.session_state.history = load_history()

if 'show_answer' not in st.session_state:
    st.session_state.show_answer = False

# 从保存的进度恢复（如果存在）
if 'current_index' not in st.session_state:
    saved_progress = st.session_state.history.get("progress")
    if saved_progress and saved_progress.get("q_list"):
        st.session_state.current_index = saved_progress.get("current_index", 0)
        st.session_state.q_list = saved_progress.get("q_list", [])
    else:
        st.session_state.current_index = 0
        st.session_state.q_list = []

if 'q_list' not in st.session_state:
    st.session_state.q_list = []
if 'shuffled_options' not in st.session_state:
    st.session_state.shuffled_options = None
if 'shuffled_for_id' not in st.session_state:
    st.session_state.shuffled_for_id = None

df = load_data()

# --- 数据检查 ---
if df is None:
    st.error(f"未找到 CSV 文件（{CSV_FILE}）。请先运行抽取脚本（extract_ccnp.py）。")
    st.stop()

# --- 侧边栏：模式设置 ---
st.sidebar.title("学习选项")

mode_options = [
    "顺序练习",
    "范围练习（顺序）",     # 顺序
    "范围练习（随机）",     # 随机
    "仅标记题目", # 顺序
    "标记题目（随机）"    # 随机
]

mode = st.sidebar.selectbox("选择模式", mode_options)

# 范围选择界面
start_q, end_q = 1, 100
if "范围练习" in mode:
    max_q = int(df['id_num'].max()) if not df.empty else 1249
    c1, c2 = st.sidebar.columns(2)
    start_q = c1.number_input("起始题号", 1, max_q, 1)
    end_q = c2.number_input("结束题号", 1, max_q, min(100, max_q))

# 开始按钮
if st.sidebar.button("开始 / 重置会话"):
    st.session_state.current_index = 0
    st.session_state.show_answer = False
    indices = []

    # 1. 顺序模式
    if mode == "顺序练习":
        indices = df.index.tolist()

    # 2 & 3. 范围选择
    elif "范围练习" in mode:
        mask = (df['id_num'] >= start_q) & (df['id_num'] <= end_q)
        indices = df[mask].index.tolist()
        
        if "随机" in mode:
            random.shuffle(indices) # 随机化

    # 4 & 5. 标记题目
    elif "标记题目" in mode:
        flagged_ids = st.session_state.history["flagged"]
        mask = df['id'].isin(flagged_ids)
        indices = df[mask].index.tolist()
        
        if "随机" in mode:
            random.shuffle(indices) # 随机化

    st.session_state.q_list = indices
    
    # 保存新的进度配置
    st.session_state.history["progress"] = {
        "mode": mode,
        "start_q": start_q if "范围练习" in mode else None,
        "end_q": end_q if "范围练习" in mode else None,
        "q_list": indices,
        "current_index": 0
    }
    save_history(st.session_state.history)
    
    st.rerun()

# --- 主界面 ---
if not st.session_state.q_list:
    st.info("👈 请在侧边栏选择模式后点击“开始 / 重置会话”。")
    
    # 数据存在但列表为空时（没有标记等情况）
    if "标记" in mode:
        cnt = len(st.session_state.history["flagged"])
        st.warning(f"已标记题目数量：{cnt}题")
        if cnt == 0:
            st.caption("在练习过程中点击“标记”按钮即可加入此列表。")
    st.stop()

# 会话完成检查
if st.session_state.current_index >= len(st.session_state.q_list):
    st.success("🎉 本次练习结束！")
    # 清除保存的进度（完成后自动重置）
    st.session_state.history["progress"] = None
    save_history(st.session_state.history)
    
    if st.button("重新开始"):
        st.session_state.current_index = 0
        st.session_state.q_list = []
        st.rerun()
    st.stop()

# 获取数据
try:
    current_row_idx = st.session_state.q_list[st.session_state.current_index]
    row = df.iloc[current_row_idx]
except IndexError:
    st.error("出现索引错误。请点击“开始 / 重置会话”重新初始化。")
    st.stop()

# --- UI显示 ---
# 标题栏
c1, c2, c3 = st.columns([6, 2, 2])
c1.title(f"{row['id']}")
c2.write(f"进度：{st.session_state.current_index + 1} / {len(st.session_state.q_list)}")

# 标记按钮
is_flagged = row['id'] in st.session_state.history["flagged"]
flag_label = "★ 已标记" if is_flagged else "☆ 标记"
if c3.button(flag_label):
    if is_flagged:
        st.session_state.history["flagged"].remove(row['id'])
    else:
        st.session_state.history["flagged"].append(row['id'])
    save_history(st.session_state.history)
    st.rerun()

st.progress((st.session_state.current_index + 1) / len(st.session_state.q_list))

# 题目内容
st.markdown("### 题目")
# 使用Markdown渲染题目，换行更美观
if pd.notna(row['question']):
    st.markdown(str(row['question']).replace('\n', '  \n'))
else:
    st.warning("题目内容不可用")

# 图片
if pd.notna(row['images']) and str(row['images']).strip():
    img_files = [x.strip() for x in str(row['images']).split(',') if x.strip()]
    
    if img_files:
        if len(img_files) == 1:
            img_path = os.path.join(IMG_FOLDER, img_files[0])
            if os.path.exists(img_path):
                st.image(img_path)
        else:
            tabs = st.tabs([f"Exhibit {i+1}" for i in range(len(img_files))])
            for i, tab in enumerate(tabs):
                img_path = os.path.join(IMG_FOLDER, img_files[i])
                if os.path.exists(img_path):
                    with tab:
                        st.image(img_path)

# 选项- 智能解析 + 随机化
st.markdown("### 选项")
options_str = str(row['options'])

if options_str and options_str.lower() != 'nan':
    lines = options_str.split('\n')
    formatted_options = []
    current_option = ""
    
    # 使用正则表达式检测 "A.", "B." 等选项开头
    option_pattern = re.compile(r"^[A-F]\.")
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        if option_pattern.match(line):
            if current_option:
                formatted_options.append(current_option)
            current_option = line
        else:
            # 续行内容，添加缩进效果
            if current_option:
                current_option += "  \n&nbsp;&nbsp;&nbsp;&nbsp;" + line
            else:
                current_option = line
    
    if current_option:
        formatted_options.append(current_option)
    
    # 问题切换时才随机化选项顺序（显示/隐藏答案时保持顺序）
    if st.session_state.shuffled_for_id != row['id'] or st.session_state.shuffled_options is None:
        shuffled = formatted_options.copy()
        # 确保打乱后的顺序与原始顺序不同
        for _ in range(10):
            random.shuffle(shuffled)
            if shuffled != formatted_options:
                break
        if shuffled == formatted_options and len(shuffled) > 1:
            shuffled[0], shuffled[1] = shuffled[1], shuffled[0]
        st.session_state.shuffled_options = shuffled
        st.session_state.shuffled_for_id = row['id']
    
    # 显示选项
    for opt in st.session_state.shuffled_options:
        st.info(opt)
else:
    st.warning("暂无选项")

# 正确答案
st.divider()
if st.button("显示 / 隐藏答案"):
    st.session_state.show_answer = not st.session_state.show_answer

if st.session_state.show_answer:
    ans = row['answer'] if pd.notna(row['answer']) else "未知"
    st.success(f"**正确答案：** {ans}")

# 导航
st.divider()
cp, cn = st.columns(2)
with cp:
    if st.button("⬅️ 上一题"):
        if st.session_state.current_index > 0:
            st.session_state.current_index -= 1
            st.session_state.show_answer = False
            save_progress()
            st.rerun()
with cn:
    if st.button("下一题 ➡️"):
        if st.session_state.current_index < len(st.session_state.q_list) - 1:
            st.session_state.current_index += 1
            st.session_state.show_answer = False
            save_progress()
            st.rerun()
