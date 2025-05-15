document.addEventListener('DOMContentLoaded', function() {
    // 添加落叶动画
    createFallingLeaves();
    
    // 方言彩蛋功能
    setupDialectEasterEgg();
    
    // 平滑滚动到锚点
    setupSmoothScroll();
});

/**
 * 创建落叶动画效果
 */
function createFallingLeaves() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const numberOfLeaves = 10;
    
    for (let i = 0; i < numberOfLeaves; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('falling-leaf');
        
        // 随机位置和延迟
        leaf.style.left = `${Math.random() * 100}%`;
        leaf.style.animationDelay = `${Math.random() * 10}s`;
        leaf.style.animationDuration = `${Math.random() * 5 + 10}s`; // 10-15秒
        
        // 随机旋转
        leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        heroSection.appendChild(leaf);
    }
}

/**
 * 设置方言彩蛋功能
 */
function setupDialectEasterEgg() {
    const dialectTrigger = document.querySelector('.dialect-trigger');
    if (!dialectTrigger) return;
    
    // 宜春方言音频集合
    const dialects = [
        { text: '恰饭', audio: 'audio/dialect-1.mp3' },
        { text: '作兴', audio: 'audio/dialect-2.mp3' },
        { text: '老表', audio: 'audio/dialect-3.mp3' }
    ];
    
    dialectTrigger.addEventListener('click', function() {
        const randomDialect = dialects[Math.floor(Math.random() * dialects.length)];
        
        // 创建音频元素（如果音频文件存在）
        try {
            const audio = new Audio(randomDialect.audio);
            audio.play().catch(e => {
                console.log('方言音频播放失败，可能需要添加音频文件');
                
                // 如果音频不存在，至少显示文本
                alert(`宜春方言: ${randomDialect.text}`);
            });
        } catch (e) {
            alert(`宜春方言: ${randomDialect.text}`);
        }
    });
}

/**
 * 设置平滑滚动到锚点
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 导航栏高度偏移
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 明信片生成器功能
 * 将在页面加载后初始化
 */
function initPostcardGenerator() {
    const postcardForm = document.getElementById('postcardForm');
    if (!postcardForm) return;
    
    const postcardPreview = document.getElementById('postcardPreview');
    const userImageInput = document.getElementById('userImage');
    const templateSelect = document.getElementById('templateSelect');
    const filterSelect = document.getElementById('filterSelect');
    
    // 监听图片上传
    userImageInput.addEventListener('change', updatePostcardPreview);
    
    // 监听模板和滤镜选择
    templateSelect.addEventListener('change', updatePostcardPreview);
    filterSelect.addEventListener('change', updatePostcardPreview);
    
    // 明信片生成预览
    function updatePostcardPreview() {
        if (!userImageInput.files || !userImageInput.files[0]) return;
        
        const file = userImageInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // 更新图片
            const img = new Image();
            img.onload = function() {
                // 应用模板和滤镜
                const template = templateSelect.value;
                const filter = filterSelect.value;
                
                // 设置预览
                postcardPreview.innerHTML = '';
                postcardPreview.appendChild(img);
                
                // 应用CSS滤镜
                img.style.filter = filter;
                img.classList.add(`template-${template}`);
            };
            
            img.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
}

// 页面滚动效果
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // 当页面滚动时展示元素的动画
    document.querySelectorAll('.fade-in-section').forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - sectionHeight / 3) {
            section.classList.add('visible');
        }
    });
}); 