// 모바일 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 모바일 메뉴 닫기
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// 애니메이션 요소들 관찰 시작
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-content, .teacher-card, .curriculum-card, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });
});

// 챗봇 토글
function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    const isVisible = chatbotContainer.style.display === 'flex';
    
    if (isVisible) {
        chatbotContainer.style.display = 'none';
    } else {
        chatbotContainer.style.display = 'flex';
        // 챗봇이 열릴 때 입력 필드에 포커스
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 100);
    }
}

// 챗봇 메시지 전송
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // 사용자 메시지 추가
    addMessage(message, 'user');
    chatInput.value = '';
    
    // 챗봇 응답 처리
    setTimeout(() => {
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
    }, 500);
}

// Enter 키로 메시지 전송
document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 메시지 추가 함수
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// 챗봇 응답 생성
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('안녕') || message.includes('hello')) {
        return '안녕하세요! 영어학원에 오신 것을 환영합니다. 무엇을 도와드릴까요?';
    } else if (message.includes('수업') || message.includes('커리큘럼')) {
        return '저희 학원은 기초 영어부터 고급 영어까지 체계적인 커리큘럼을 제공합니다. 구체적인 수업 내용에 대해 더 알고 싶으시다면 상담 신청을 해주세요!';
    } else if (message.includes('가격') || message.includes('비용') || message.includes('수강료')) {
        return '수강료는 수업 레벨과 횟수에 따라 다릅니다. 정확한 가격은 무료 상담을 통해 안내해드리겠습니다.';
    } else if (message.includes('위치') || message.includes('주소')) {
        return '서울시 노원구 노원로532에 위치해 있습니다. 지하철 노원역에서 도보 5분 거리입니다.';
    } else if (message.includes('연락처') || message.includes('전화')) {
        return '전화: 02-930-5183, 핸드폰: 010-9474-0992로 연락주세요.';
    } else if (message.includes('시간') || message.includes('운영')) {
        return '평일 09:00~22:00, 주말 10:00~18:00에 운영합니다. (공휴일 휴무)';
    } else if (message.includes('상담') || message.includes('신청')) {
        return '무료 상담 신청은 연락처 섹션의 상담 신청 폼을 이용해주세요. 빠른 시일 내에 연락드리겠습니다!';
    } else {
        return '죄송합니다. 더 자세한 정보가 필요하시다면 상담 신청을 해주시거나 02-930-5183으로 전화주세요.';
    }
}

// 상담 신청 폼 제출
document.getElementById('consultationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 폼 데이터 수집
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        level: document.getElementById('level').value,
        message: document.getElementById('message').value
    };
    
    // 카카오톡으로 데이터 전송 (실제 구현에서는 서버로 전송)
    sendToKakao(formData);
    
    // 성공 메시지 표시
    showSuccessMessage();
    
    // 폼 초기화
    this.reset();
});

// 카카오톡으로 데이터 전송 (시뮬레이션)
function sendToKakao(data) {
    // 실제 구현에서는 서버 API를 통해 카카오톡으로 전송
    console.log('상담 신청 데이터:', data);
    console.log('카카오톡 계정: shuming06@naver.com으로 전송됨');
    
    // 여기서는 실제 전송을 시뮬레이션
    // 실제 구현 시에는 fetch API나 다른 방법을 사용하여 서버로 전송
}

// 성공 메시지 표시
function showSuccessMessage() {
    // 기존 성공 메시지가 있다면 제거
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 성공 메시지 생성
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    `;
    successMessage.textContent = '상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.';
    
    // CSS 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successMessage);
    
    // 5초 후 메시지 제거
    setTimeout(() => {
        successMessage.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 5000);
    
    // slideOutRight 애니메이션 추가
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
        @keyframes slideOutRight {
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
    document.head.appendChild(slideOutStyle);
}

// 무료 상담 신청하기 버튼 클릭 시
function openConsultation() {
    // 연락처 섹션으로 스크롤
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
    
    // 상담 신청 폼에 포커스
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 1000);
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', () => {
    // 페이지 로드 후 약간의 지연을 두고 애니메이션 시작
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 페이지 로드 전 스타일
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// 스크롤 진행률 표시 (선택사항)
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // 스크롤 진행률을 시각적으로 표시하고 싶다면 여기에 코드 추가
    // 예: 프로그레스 바, 백투탑 버튼 등
});

// 백투탑 버튼 (선택사항)
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2563eb, #7c3aed);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px rgba(37, 99, 235, 0.3);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(backToTop);
    
    // 스크롤 시 버튼 표시/숨김
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
}

// 백투탑 버튼 생성
createBackToTopButton();

