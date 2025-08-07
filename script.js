
// 처음 로딩 시 환영 메시지
document.addEventListener('DOMContentLoaded', function() {
    Swal.fire({
        title: '청소당번 뽑기에 오신 것을 환영합니다! 🎉',
        text: '버튼을 클릭하여 청소당번 5명을 뽑아보세요!',
        icon: 'info',
        confirmButtonText: '시작하기',
        confirmButtonColor: '#0d6efd',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
});

document.getElementById('drawButton').addEventListener('click', async function() {
    const button = this;
    
    // 버튼 로딩 상태
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>뽑는 중...';
    button.disabled = true;
    
    // 로딩 시뮬레이션 (시각적 효과)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 1부터 25까지의 숫자 배열 생성
    let numbers = [];
    for (let i = 1; i <= 25; i++) {
        numbers.push(i);
    }
    
    // 랜덤으로 5개 선택 (중복 없이)
    let selected = [];
    for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * numbers.length);
        selected.push(numbers[randomIndex]);
        numbers.splice(randomIndex, 1);
    }
    
    // 결과를 오름차순으로 정렬
    selected.sort((a, b) => a - b);
    
    // SweetAlert2로 결과 표시
    const resultHtml = `
        <div class="row g-2 justify-content-center">
            ${selected.map((num, index) => `
                <div class="col-auto">
                    <div class="badge bg-primary fs-4 rounded-circle p-3 animate__animated animate__bounceIn" 
                         style="animation-delay: ${index * 0.1}s; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
                        ${num}번
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="mt-4 alert alert-warning border-0 rounded-3">
            <i class="bi bi-exclamation-triangle me-2"></i>
            선택된 분들은 청소를 부탁드립니다!
        </div>
    `;
    
    Swal.fire({
        title: '🎉 청소당번이 결정되었습니다! 🎉',
        html: resultHtml,
        icon: 'success',
        confirmButtonText: '다시 뽑기',
        confirmButtonColor: '#198754',
        cancelButtonText: '완료',
        cancelButtonColor: '#6c757d',
        showCancelButton: true,
        width: '600px',
        showClass: {
            popup: 'animate__animated animate__zoomIn'
        },
        hideClass: {
            popup: 'animate__animated animate__zoomOut'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // 다시 뽑기 클릭 시 버튼 리셋하고 재실행
            resetButton();
            setTimeout(() => {
                document.getElementById('drawButton').click();
            }, 300);
        } else {
            // 완료 시 축하 메시지
            Swal.fire({
                title: '수고하세요! 👏',
                text: '선택된 분들의 청소를 응원합니다!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
            resetButton();
        }
    });
    
    // 웹페이지에도 결과 표시
    displayResultOnPage(selected);
    
    function resetButton() {
        button.innerHTML = '<i class="bi bi-shuffle me-2"></i>청소당번 뽑기';
        button.disabled = false;
        button.className = 'btn btn-lg btn-success px-5 py-3 rounded-pill shadow-sm';
    }
    
    // 버튼 상태 변경
    button.innerHTML = '<i class="bi bi-arrow-clockwise me-2"></i>다시 뽑기';
    button.disabled = false;
    button.className = 'btn btn-lg btn-success px-5 py-3 rounded-pill shadow-sm';
});

function displayResultOnPage(selected) {
    const resultDiv = document.getElementById('result');
    const numbersDiv = document.getElementById('numbers');
    
    numbersDiv.innerHTML = '';
    
    selected.forEach((num, index) => {
        const badge = document.createElement('div');
        badge.className = 'badge bg-gradient bg-primary fs-5 rounded-circle p-3 animate__animated animate__bounceIn shadow';
        badge.style.animationDelay = (index * 0.1) + 's';
        badge.style.width = '70px';
        badge.style.height = '70px';
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.justifyContent = 'center';
        badge.textContent = num + '번';
        numbersDiv.appendChild(badge);
    });
    
    resultDiv.style.display = 'block';
    resultDiv.className = 'mt-5 animate__animated animate__fadeInUp';
}

// 키보드 단축키 (스페이스바로 뽑기)
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !document.getElementById('drawButton').disabled) {
        event.preventDefault();
        document.getElementById('drawButton').click();
    }
});
