// 日志解析和可视化工具

// DOM 元素
const logInput = document.getElementById('logInput');
const parseBtn = document.getElementById('parseBtn');
const logOutput = document.getElementById('logOutput');

// 示例日志，用于测试
const sampleLog = `2025-10-16T02:52:16.018041779Z {"level":"debug",message:"http response: {\"ueInfo\":\"asdsad\"}"}
2025-10-16T02:53:16.018041779Z {"level":"info",message:"user login: {\"username\":\"testuser\",\"ip\":\"192.168.1.1\"}"}
2025-10-16T02:54:16.018041779Z {"level":"error",message:"database error: {\"code\":500,\"message\":\"connection failed\",\"details\":{\"host\":\"localhost\",\"port\":3306}}"}`;

// 初始化页面
function init() {
    // 设置示例日志
    logInput.value = sampleLog;
    // 绑定事件
    parseBtn.addEventListener('click', parseLogs);
    logInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            parseLogs();
        }
    });
}

// 解析日志
function parseLogs() {
    const input = logInput.value;
    if (!input.trim()) {
        logOutput.innerHTML = '<p style="color: #e74c3c;">请输入日志内容</p>';
        return;
    }

    const lines = input.split('\n').filter(line => line.trim());
    logOutput.innerHTML = '';

    lines.forEach((line, index) => {
        const logLine = document.createElement('div');
        logLine.className = 'log-line';
        logLine.innerHTML = `<strong>日志行 ${index + 1}:</strong> ${escapeHtml(line)}`;

        // 尝试解析日志中的 JSON
        const parsedData = parseLogLine(line);
        if (parsedData.jsonData) {
            const jsonContainer = document.createElement('div');
            jsonContainer.className = 'json-container';
            
            // 创建标题栏
            const titleBar = document.createElement('div');
            titleBar.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;';
            
            // 创建标题文本
            const titleText = document.createElement('span');
            titleText.style.cssText = 'font-weight: bold; color: #27ae60;';
            titleText.textContent = '提取的 JSON 数据：';
            
            // 创建复制按钮
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = '复制 JSON';
            copyBtn.addEventListener('click', () => {
                try {
                    const jsonString = JSON.stringify(parsedData.jsonData, null, 2);
                    console.log('准备复制的JSON:', jsonString);
                    copyToClipboard(jsonString);
                } catch (error) {
                    console.error('JSON.stringify错误:', error);
                    showNotification('复制失败: JSON格式化错误', 'error');
                }
            });
            
            // 创建 JSON 内容显示
            const jsonContent = document.createElement('div');
            jsonContent.innerHTML = formatJSON(parsedData.jsonData);
            
            // 组装元素
            titleBar.appendChild(titleText);
            titleBar.appendChild(copyBtn);
            jsonContainer.appendChild(titleBar);
            jsonContainer.appendChild(jsonContent);
            
            logLine.appendChild(jsonContainer);
        }

        logOutput.appendChild(logLine);
    });
    
    // 为所有折叠按钮添加事件监听器
    addCollapseEventListeners();
}

// 解析单行日志
function parseLogLine(line) {
    try {
        // 尝试匹配 JSON 部分
        const jsonMatch = line.match(/\{.*\}/s);
        if (jsonMatch) {
            const jsonStr = jsonMatch[0];
            const parsed = JSON.parse(jsonStr);
            
            // 检查 message 字段中是否包含转义的 JSON
            if (parsed.message) {
                const innerJson = extractInnerJSON(parsed.message);
                if (innerJson) {
                    parsed.innerJson = innerJson;
                }
            }
            
            return { jsonData: parsed };
        }
    } catch (error) {
        // 如果顶层不是有效的 JSON，尝试提取内部的 JSON
        const innerJson = extractInnerJSON(line);
        if (innerJson) {
            return { jsonData: innerJson };
        }
    }
    return { jsonData: null };
}

// 提取字符串中的转义 JSON
function extractInnerJSON(str) {
    try {
        // 查找可能的 JSON 开始位置
        const jsonStart = str.indexOf('{');
        if (jsonStart !== -1) {
            // 尝试从不同位置解析 JSON
            for (let i = str.length; i > jsonStart; i--) {
                try {
                    const possibleJson = str.substring(jsonStart, i);
                    const parsed = JSON.parse(possibleJson);
                    return parsed;
                } catch (error) {
                    // 继续尝试
                }
            }
        }
    } catch (error) {
        // 忽略错误
    }
    return null;
}

// 格式化 JSON 并添加折叠功能
function formatJSON(data, level = 0) {
    const indent = ' '.repeat(level * 2);
    let result = '';

    if (data === null) {
        return '<span class="json-null">null</span>';
    }

    if (typeof data === 'string') {
        return `<span class="json-string">"${escapeHtml(data)}"</span>`;
    }

    if (typeof data === 'number') {
        return `<span class="json-number">${data}</span>`;
    }

    if (typeof data === 'boolean') {
        return `<span class="json-boolean">${data}</span>`;
    }

    if (Array.isArray(data)) {
        if (data.length === 0) {
            return '[]';
        }

        const collapsed = level > 0;
        const collapseId = `collapse-${Math.random().toString(36).substr(2, 9)}`;

        result += `[
${indent}  <span class="collapse-btn" data-target="${collapseId}">${collapsed ? '▶' : '▼'}</span>
${indent}  <div id="${collapseId}" class="json-item ${collapsed ? 'hidden' : ''}">`;

        data.forEach((item, index) => {
            result += `
${indent}    ${formatJSON(item, level + 1)}${index < data.length - 1 ? ',' : ''}`;
        });

        result += `
${indent}  </div>
${indent}]`;
        return result;
    }

    if (typeof data === 'object') {
        const keys = Object.keys(data);
        if (keys.length === 0) {
            return '{}';
        }

        const collapsed = level > 0;
        const collapseId = `collapse-${Math.random().toString(36).substr(2, 9)}`;

        result += `{
${indent}  <span class="collapse-btn" data-target="${collapseId}">${collapsed ? '▶' : '▼'}</span>
${indent}  <div id="${collapseId}" class="json-item ${collapsed ? 'hidden' : ''}">`;

        keys.forEach((key, index) => {
            result += `
${indent}    <span class="json-key">"${key}"</span>: ${formatJSON(data[key], level + 1)}${index < keys.length - 1 ? ',' : ''}`;
        });

        result += `
${indent}  </div>
${indent}}`;
        return result;
    }

    return escapeHtml(String(data));
}

// 切换折叠状态
function toggleCollapse(event) {
    const collapseId = event.target.getAttribute('data-target');
    if (!collapseId) return;
    
    const element = document.getElementById(collapseId);
    if (!element) return;
    
    const btn = event.target;
    element.classList.toggle('hidden');
    btn.textContent = element.classList.contains('hidden') ? '▶' : '▼';
}

// 为所有折叠按钮添加事件监听器
function addCollapseEventListeners() {
    const collapseBtns = document.querySelectorAll('.collapse-btn');
    collapseBtns.forEach(btn => {
        btn.addEventListener('click', toggleCollapse);
    });
}

// 复制到剪贴板
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('已复制到剪贴板！');
    }).catch(err => {
        console.error('复制失败：', err);
        showNotification('复制失败，请手动复制', 'error');
    });
}

// 显示通知
function showNotification(message, type = 'success') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    // 设置样式
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
    } else {
        notification.style.backgroundColor = '#e74c3c';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // 3秒后移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// HTML 转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);