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
    
    // 줄바꿈을 <br> 태그로 변환
    const formattedText = text.replace(/\n/g, '<br>');
    messageDiv.innerHTML = formattedText;
    
    // 링크 클릭 이벤트 처리
    const links = messageDiv.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // 메시지 애니메이션 효과
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(10px)';
    messageDiv.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
}

// 빠른 질문 처리
function askQuickQuestion(question) {
    const botResponse = getBotResponse(question);
    addMessage(question, 'user');
    setTimeout(() => {
        addMessage(botResponse, 'bot');
    }, 500);
}

// 챗봇 응답 생성
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // 인사말 및 기본 대화
    if (message.includes('안녕') || message.includes('hello') || message.includes('hi') || message.includes('하이')) {
        return '안녕하세요! Fun-Fun English에 오신 것을 환영합니다! 😊 무엇을 도와드릴까요?';
    }
    
    // 수업 관련
    else if (message.includes('수업') || message.includes('커리큘럼') || message.includes('과정') || message.includes('레벨')) {
        return '저희 학원은 기초반, 중급반, 고급반으로 구성된 체계적인 커리큘럼을 제공합니다! 📚 구체적인 수업 내용에 대해 더 알고 싶으시다면 상담 신청을 해주세요!';
    }
    
    // 가격 관련
    else if (message.includes('가격') || message.includes('비용') || message.includes('수강료') || message.includes('얼마') || message.includes('돈') || message.includes('요금')) {
        return '수강료는 수업 레벨과 횟수에 따라 다릅니다! 💰 정확한 가격은 무료 상담을 통해 안내해드리겠습니다.';
    }
    
    // 위치 관련
    else if (message.includes('위치') || message.includes('주소') || message.includes('어디') || message.includes('지하철') || message.includes('교통') || message.includes('버스')) {
        return '서울시 노원구 노원로532에 위치해 있습니다! 🚇 지하철 노원역에서 도보 5분 거리입니다.';
    }
    
    // 연락처 관련
    else if (message.includes('연락처') || message.includes('전화') || message.includes('번호') || message.includes('연락') || message.includes('문의')) {
        return '📞 전화: 02-930-5183\n📱 핸드폰: 010-9474-0992\n📧 이메일: son070@naver.com';
    }
    
    // 운영시간 관련
    else if (message.includes('시간') || message.includes('운영') || message.includes('언제') || message.includes('휴무') || message.includes('오픈') || message.includes('마감')) {
        return '⏰ 평일: 09:00~22:00\n⏰ 주말: 10:00~18:00\n❌ 공휴일 휴무';
    }
    
    // 강사 관련
    else if (message.includes('강사') || message.includes('선생님') || message.includes('teacher') || message.includes('교사') || message.includes('instructor')) {
        return '저희 학원에는 Sarah Kim(회화&발음), Jennifer Park(문법&작문), Emma Lee(토익&토플) 등 3명의 전문 강사가 있습니다! 👩‍🏫\n\n<a href="teachers.html" target="_blank">강사진 상세 정보 보기</a>';
    }
    
    // 시험 관련
    else if (message.includes('토익') || message.includes('토플') || message.includes('시험') || message.includes('test') || message.includes('exam') || message.includes('점수')) {
        return '토익과 토플 시험 대비 수업을 제공합니다! 📝 Emma Lee 선생님이 전문적으로 지도하십니다.';
    }
    
    // 회화 관련
    else if (message.includes('회화') || message.includes('말하기') || message.includes('speaking') || message.includes('conversation') || message.includes('발음')) {
        return 'Sarah Kim 선생님이 미국 UCLA 출신으로 8년간의 경험을 바탕으로 회화와 발음을 가르치십니다! 🗣️';
    }
    
    // 문법 관련
    else if (message.includes('문법') || message.includes('작문') || message.includes('grammar') || message.includes('writing') || message.includes('composition')) {
        return 'Jennifer Park 선생님이 영국 옥스퍼드 대학원 출신으로 10년간의 경험으로 문법과 작문을 가르치십니다! ✍️';
    }
    
    // 상담 관련
    else if (message.includes('상담') || message.includes('신청') || message.includes('문의') || message.includes('consultation') || message.includes('상담받고')) {
        return '무료 상담 신청은 연락처 섹션의 상담 신청 폼을 이용해주세요! 📋 빠른 시일 내에 연락드리겠습니다!';
    }
    
    // 학원 이름 관련
    else if (message.includes('학원') || message.includes('fun') || message.includes('english') || message.includes('academy') || message.includes('학원이름')) {
        return 'Fun-Fun English는 영어 실력 향상을 위한 최고의 선택입니다! 🎯 체계적인 커리큘럼과 전문 강사진이 여러분을 기다리고 있습니다!';
    }
    
    // 감사 표현
    else if (message.includes('감사') || message.includes('고마워') || message.includes('thank') || message.includes('thanks') || message.includes('감사합니다')) {
        return '천만에요! 😊 더 궁금한 점이 있으시면 언제든 물어보세요!';
    }
    
    // 수업 일정 관련
    else if (message.includes('일정') || message.includes('스케줄') || message.includes('schedule') || message.includes('언제') || message.includes('몇시')) {
        return '수업 일정은 학생의 레벨과 선호 시간에 따라 맞춤형으로 조정됩니다! 📅 구체적인 일정은 상담을 통해 안내해드리겠습니다.';
    }
    
    // 수업 인원 관련
    else if (message.includes('인원') || message.includes('정원') || message.includes('몇명') || message.includes('group') || message.includes('소수')) {
        return '저희는 소수정예 수업을 원칙으로 합니다! 👥 기초반은 최대 6명, 중급반과 고급반은 최대 4명까지 수강 가능합니다.';
    }
    
    // 수업 방식 관련
    else if (message.includes('방식') || message.includes('방법') || message.includes('how') || message.includes('어떻게') || message.includes('수업방식')) {
        return '저희는 체계적인 커리큘럼과 개인별 맞춤 지도를 통해 실용적인 영어 실력을 기릅니다! 📖 이론과 실습을 병행하여 효과적인 학습을 도모합니다.';
    }
    
    // 온라인 수업 관련
    else if (message.includes('온라인') || message.includes('online') || message.includes('비대면') || message.includes('zoom') || message.includes('화상')) {
        return '현재는 대면 수업만 진행하고 있습니다! 💻 온라인 수업에 대한 문의가 많아 향후 검토 중입니다.';
    }
    
    // 교재 관련
    else if (message.includes('교재') || message.includes('책') || message.includes('textbook') || message.includes('학습자료') || message.includes('material')) {
        return '각 레벨에 맞는 체계적인 교재를 사용합니다! 📚 기본 교재 외에도 보조 자료와 실습 문제를 제공하여 학습 효과를 높입니다.';
    }
    
    // 수업 시간 관련
    else if (message.includes('수업시간') || message.includes('한시간') || message.includes('duration') || message.includes('길이') || message.includes('몇분')) {
        return '기본 수업 시간은 50분입니다! ⏱️ 레벨과 수업 내용에 따라 40분~60분으로 조정될 수 있습니다.';
    }
    
    // 수업 횟수 관련
    else if (message.includes('횟수') || message.includes('주') || message.includes('frequency') || message.includes('몇번') || message.includes('빈도')) {
        return '일반적으로 주 2회 수업을 권장합니다! 📅 개인별 학습 계획에 따라 주 1회~3회까지 조정 가능합니다.';
    }
    
    // 레벨 테스트 관련
    else if (message.includes('테스트') || message.includes('레벨테스트') || message.includes('level test') || message.includes('평가') || message.includes('placement')) {
        return '입학 전 무료 레벨 테스트를 실시합니다! 📝 현재 영어 실력을 정확히 파악하여 적절한 반을 배정해드립니다.';
    }
    
    // 수업 시작 관련
    else if (message.includes('시작') || message.includes('언제부터') || message.includes('start') || message.includes('개강') || message.includes('등록')) {
        return '수업은 상담 후 즉시 시작 가능합니다! 🚀 레벨 테스트 후 적절한 반에 배정하여 바로 수업을 시작할 수 있습니다.';
    }
    
    // 환불 정책 관련
    else if (message.includes('환불') || message.includes('refund') || message.includes('취소') || message.includes('cancel') || message.includes('반환')) {
        return '수업 시작 전에는 전액 환불, 시작 후에는 잔여 수업일수에 따른 비례 환불이 가능합니다! 💰 구체적인 환불 규정은 상담 시 안내해드립니다.';
    }
    
    // 할인 혜택 관련
    else if (message.includes('할인') || message.includes('discount') || message.includes('혜택') || message.includes('benefit') || message.includes('이벤트')) {
        return '형제자매 동반 수강 시 할인 혜택이 있습니다! 🎁 또한 장기 수강 시에도 특별한 혜택을 제공합니다.';
    }
    
    // 무료 체험 관련
    else if (message.includes('체험') || message.includes('trial') || message.includes('무료') || message.includes('free') || message.includes('맛보기')) {
        return '무료 체험 수업을 제공합니다! 🎯 1회 체험 수업을 통해 저희 학원의 수업 방식과 분위기를 직접 경험해보세요!';
    }
    
    // 성인 수업 관련
    else if (message.includes('성인') || message.includes('adult') || message.includes('직장인') || message.includes('business') || message.includes('회사원')) {
        return '성인을 위한 맞춤형 수업을 제공합니다! 💼 업무에 필요한 비즈니스 영어부터 일상 회화까지 다양한 수업을 선택할 수 있습니다.';
    }
    
    // 어린이 수업 관련
    else if (message.includes('어린이') || message.includes('child') || message.includes('초등') || message.includes('elementary') || message.includes('유아')) {
        return '어린이를 위한 재미있고 체계적인 영어 수업을 제공합니다! 🎈 게임과 노래를 통해 자연스럽게 영어를 배울 수 있습니다.';
    }
    
    // 중고등학생 관련
    else if (message.includes('중학생') || message.includes('고등학생') || message.includes('student') || message.includes('teenager') || message.includes('학교')) {
        return '중고등학생을 위한 학교 영어와 내신 대비 수업을 제공합니다! 🎓 학교 수업과 연계하여 실력 향상을 도모합니다.';
    }
    
    // 비즈니스 영어 관련
    else if (message.includes('비즈니스') || message.includes('business') || message.includes('업무') || message.includes('work') || message.includes('회사')) {
        return '비즈니스 영어 수업을 제공합니다! 💼 이메일 작성, 회의 진행, 프레젠테이션 등 업무에 필요한 영어를 배울 수 있습니다.';
    }
    
    // 여행 영어 관련
    else if (message.includes('여행') || message.includes('travel') || message.includes('해외') || message.includes('abroad') || message.includes('공항')) {
        return '여행 영어 수업을 제공합니다! ✈️ 공항, 호텔, 식당 등 여행지에서 필요한 실용적인 영어 표현을 배울 수 있습니다.';
    }
    
    // 기본 응답
    else {
        return '죄송합니다. 더 자세한 정보가 필요하시다면 상담 신청을 해주시거나 📞 02-930-5183으로 전화주세요!';
    }
}

// 상담신청 폼 제출 250915_chatgpt 

document.getElementById('consultationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const level = document.getElementById('level').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !email || !level || !message) {
        alert('모든 항목을 입력해 주세요.');
        return;
    }

    // 메일 본문 구성
    const mailSubject = `Fun-Fun English 상담 신청 - ${name}`;
    const mailBody = `
안녕하세요! Fun-Fun English 무료 상담 신청입니다.

이름: ${name}
연락처: ${phone}
이메일: ${email}
영어 수준: ${level}
상담 내용:
${message}

감사합니다.`;

    // 메일 전송용 mailto 링크
    const mailtoLink = `mailto:son070@naver.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    // 사용자에게 알림
    alert('이메일 앱이 열립니다. 메일을 전송해 주세요.');

    // 이메일 클라이언트 열기
    window.location.href = mailtoLink;
});

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

// 히어로 슬라이더 기능
let currentSlideIndex = 0;
let slideInterval;

// 전역 함수로 정의 (HTML에서 호출하기 위해)
window.changeSlide = function(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
};

window.currentSlide = function(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
};

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // 모든 슬라이드 숨기기
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    
    // 모든 도트 비활성화
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function startAutoSlide() {
    // 기존 인터벌 정리
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    
    // 자동 슬라이드 (5초마다)
    slideInterval = setInterval(() => {
        const slides = document.querySelectorAll('.slide');
        if (slides.length > 0) {
            changeSlide(1);
        }
    }, 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// 페이지 로드 시 슬라이더 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료');
    
    // 슬라이더 요소 확인
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    console.log('슬라이드 개수:', slides.length);
    console.log('도트 개수:', dots.length);
    
    // 첫 번째 슬라이드 활성화
    showSlide(0);
    
    // 자동 슬라이드 시작
    startAutoSlide();
    
    // 마우스 호버 이벤트
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
        console.log('마우스 호버 이벤트 등록 완료');
    }
    
    // 수동 테스트를 위한 키보드 이벤트
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
});

// 개인정보처리방침 표시
function showPrivacyPolicy() {
    const policyContent = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>개인정보처리방침</h3>
                    <button onclick="closeModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <h4>1. 개인정보의 수집 및 이용목적</h4>
                    <p>Fun-Fun English는 상담 신청 및 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
                    
                    <h4>2. 수집하는 개인정보 항목</h4>
                    <ul>
                        <li>필수항목: 이름, 연락처, 이메일</li>
                        <li>선택항목: 현재 영어 수준, 상담 내용</li>
                    </ul>
                    
                    <h4>3. 개인정보의 보유 및 이용기간</h4>
                    <p>상담 신청 후 1년간 보관하며, 이후 자동 삭제됩니다.</p>
                    
                    <h4>4. 개인정보의 제3자 제공</h4>
                    <p>고객의 동의 없이 제3자에게 개인정보를 제공하지 않습니다.</p>
                    
                    <h4>5. 개인정보 보호책임자</h4>
                    <p>이메일: son070@naver.com</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', policyContent);
}

// 이용약관 표시
function showTermsOfService() {
    const termsContent = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>이용약관</h3>
                    <button onclick="closeModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <h4>제1조 (목적)</h4>
                    <p>본 약관은 Fun-Fun English가 제공하는 영어 교육 서비스의 이용과 관련하여 고객과 학원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                    
                    <h4>제2조 (서비스 내용)</h4>
                    <p>학원은 영어 교육 서비스를 제공하며, 구체적인 서비스 내용은 각 과정별 커리큘럼에 따라 제공됩니다.</p>
                    
                    <h4>제3조 (수강료 및 결제)</h4>
                    <p>수강료는 각 과정별로 정해진 금액을 납부해야 하며, 결제 방법은 현금 또는 계좌이체로 가능합니다.</p>
                    
                    <h4>제4조 (환불 규정)</h4>
                    <p>수업 시작 전: 전액 환불<br>수업 시작 후: 잔여 수업일수에 따른 비례 환불</p>
                    
                    <h4>제5조 (준수사항)</h4>
                    <p>학원 내에서는 수업에 지장을 주는 행위를 금지하며, 이를 위반할 경우 수강 제한 조치를 받을 수 있습니다.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', termsContent);
}

// 환불정책 표시
function showRefundPolicy() {
    const refundContent = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>환불정책</h3>
                    <button onclick="closeModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <h4>1. 환불 기준</h4>
                    <p>수업 시작 전: 전액 환불</p>
                    <p>수업 시작 후: 잔여 수업일수 기준 비례 환불</p>

                    <h4>2. 환불 요청 절차</h4>
                    <ul>
                        <li>전화 또는 이메일로 환불 의사 전달</li>
                        <li>환불 신청서 작성 및 본인 확인</li>
                        <li>영업일 기준 5일 이내 처리</li>
                    </ul>

                    <h4>3. 환불 불가 항목</h4>
                    <ul>
                        <li>이미 제공된 수업 및 교재 비용</li>
                        <li>이벤트/프로모션성 추가 혜택 금액</li>
                    </ul>

                    <h4>4. 문의</h4>
                    <p>환불 관련 문의: 02-930-5183 / son070@naver.com</p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', refundContent);
}

// 모달 닫기
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// 커리큘럼 상세 정보 표시
function showCurriculumDetail(level) {
    const levelNames = {
        'beginner': '기초반',
        'intermediate': '중급반',
        'advanced': '고급반'
    };
    
    const levelInfo = {
        'beginner': {
            title: '기초반 상세 커리큘럼',
            description: '영어를 처음 시작하는 분들을 위한 체계적인 커리큘럼입니다.',
            duration: '3-6개월',
            target: '영어 기초가 부족한 분, 알파벳부터 시작하고 싶은 분',
            features: [
                '알파벳 및 기본 발음 학습',
                '기초 문법 구조 이해',
                '일상생활 회화 표현',
                '기초 어휘 500개 습득',
                '간단한 자기소개 및 대화'
            ]
        },
        'intermediate': {
            title: '중급반 상세 커리큘럼',
            description: '기초를 다진 후 더 자연스러운 영어 구사를 목표로 합니다.',
            duration: '6-12개월',
            target: '기초 영어를 마친 분, 자연스러운 회화를 원하는 분',
            features: [
                '중급 문법 및 표현 학습',
                '자연스러운 회화 연습',
                '문화적 맥락 이해',
                '확장된 어휘력 개발',
                '다양한 주제 토론'
            ]
        },
        'advanced': {
            title: '고급반 상세 커리큘럼',
            description: '전문적인 영어 실력을 바탕으로 비즈니스와 학술 영어를 마스터합니다.',
            duration: '12개월 이상',
            target: '고급 영어를 원하는 분, 비즈니스 영어가 필요한 분',
            features: [
                '고급 문법 및 작문',
                '비즈니스 영어 표현',
                '프레젠테이션 스킬',
                '전문 어휘 및 표현',
                '학술 영어 및 논문 작성'
            ]
        }
    };
    
    const info = levelInfo[level];
    const levelName = levelNames[level];
    
    const modalContent = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content curriculum-modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>${info.title}</h3>
                    <button onclick="closeModal()" class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="curriculum-detail-header">
                        <h4>${levelName}</h4>
                        <p>${info.description}</p>
                    </div>
                    
                    <div class="curriculum-detail-info">
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <strong>학습 기간</strong>
                                <span>${info.duration}</span>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <strong>대상</strong>
                                <span>${info.target}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="curriculum-features">
                        <h5>주요 학습 내용</h5>
                        <ul>
                            ${info.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="curriculum-cta">
                        <button class="cta-button" onclick="openConsultation()">
                            상담 신청하기
                        </button>
                        <p class="cta-note">* 상담을 통해 개인별 맞춤 학습 계획을 수립해드립니다.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
}

// 백투탑 버튼 생성
createBackToTopButton();

 