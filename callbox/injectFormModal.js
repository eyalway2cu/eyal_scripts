// Configuration
const buttonSelector = "#modal-trigger";
const webhook = "XXXX";
const title = "אנא הזינו נייד וניצור עמכם קשר ב-Whatsapp";
const successMessage = "תודה, שלחנו לכם הודעה לוואטסאפ";
const failMessage = "משהו השתבש, אנא בדקו את המספר ונסו שוב";
const inputPlaceholder = "אנא הזינו מספר טלפון";
const buttonText = "דברו איתי!";

// Inject modal into the page
function injectModal() {
    const modalHTML = `
        <div id="phoneModal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="loaderModal" style="display: none;"></div>
                <span>${title}</span>
                <form id="phoneForm">
                    <div class="input-container">
                        <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="${inputPlaceholder}" pattern="^05[0-9]{7,8}$" required>
                        <input type="hidden" id="sid" name="sid"/>
                        <span id="validation-icon"></span>
                    </div>
                    <button type="submit">${buttonText}</button>
                </form>
                <div id="message"></div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modalCSS = `
                    body #phoneModal {
                    position: fixed;
                    z-index: 100; /* Sit on top */
                    left: 0;
                    top: 0;
                    width: 100%; /* Full width */
                    height: 100%; /* Full height */
                    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: fadeIn 0.5s;
                }
                /* Fade in animation */
                @keyframes fadeIn {
                    from {opacity: 0;}
                    to {opacity: 1;}
                }
                /* Fade out animation */
                @keyframes fadeOut {
                    from {opacity: 1;}
                    to {opacity: 0;}
                }
                /* Style for the Modal Content */
                #phoneModal .modal-content {
                    position: relative;
                    background-color: white;
                    padding: 20px;
                    border: 1px solid #888;
                    width: 80%; /* Responsive width */
                    max-width: 400px; /* Maximum width */
                    text-align: center;
                    font-size: 1.3em;
                    font-family: arial;
                    border-radius: 15px;
                }
                #phoneModal .modal-content span{
                    display: block;
                    margin-bottom: 15px;
                    direction: rtl;
                    font-size: 1em;
                }
                #phoneModal form#phoneForm {
                    margin: 0;
                }
                /* Style for form elements */
                #phoneModal .input-container {
                    position: relative;
                    margin-bottom: 15px;
                }
                #phoneModal input {
                    border-radius: 15px;
                }
                #phoneModal input[type="tel"] {
                    width: 100%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    display: inline-block;
                    border: 1px solid #ccc;
                    box-sizing: border-box;
                    text-align: center;
                    font-size: 1em;
                }
                #phoneModal #validation-icon {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                #phoneModal .modal-content button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 14px 20px;
                    margin: 6px 0;
                    margin-top: 4px;
                    border: none;
                    cursor: pointer;
                    width: 100%;
                    direction: rtl;
                    font-size: 1em;
                    border-radius: 15px;
                }
                #phoneModal .modal-content button:hover {
                    opacity: 0.8;
                }
                #phoneModal #message {
                    color: green;
                    display: none;
                }
                #phoneModal .loaderModal {
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #3498db;
                    border-radius: 50%;
                    width: 200px;
                    height: 200px;
                    animation: spin 2s linear infinite;
                    margin: auto;
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 10%;
                    margin-left: auto;
                    margin-right: auto;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = modalCSS;
    document.head.appendChild(styleSheet);
}

// Add event listeners for the modal
function setupModalEventListeners() {
    document.querySelector(buttonSelector).addEventListener('click', openModal);
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('phoneModal')) {
            closeModal();
        }
    });
    document.getElementById('phoneNumber').addEventListener('input', validatePhoneNumber);
    document.getElementById('phoneForm').addEventListener('submit', submitPhoneNumber);
}

// Open the modal
function openModal(event) {
    event.preventDefault();
    const modal = document.getElementById('phoneModal');
    modal.style.display = 'flex';
    modal.style.animation = 'fadeIn 0.5s';
    document.querySelector("form#phoneForm").style.display = "block";
    document.querySelector(".modal-content span").style.display = "block";
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('phoneModal');
    modal.style.animation = 'fadeOut 0.5s';
    setTimeout(function() {
        modal.style.display = 'none';
        document.getElementById('message').style.display = 'none';
        document.getElementById('validation-icon').style.display = 'none';
    }, 500);
}

// Validate phone number input
function validatePhoneNumber() {
    const regex = /^05[0-9]{7,8}$/;
    const validationIcon = document.getElementById('validation-icon');
    validationIcon.textContent = regex.test(this.value) ? '✓' : '✗';
    validationIcon.style.color = regex.test(this.value) ? 'green' : 'red';
    validationIcon.style.display = 'block';
}

// Handle form submission
function submitPhoneNumber(event) {
    event.preventDefault();
    const loader = document.querySelector('.loaderModal');
    loader.style.display = 'block'; // Show loader

    const phoneNumber = document.getElementById('phoneNumber').value;
    let sid = "";
    if (typeof __ctm !== 'undefined' && __ctm !== null && __ctm.config && __ctm.config.sid !== null) {
        sid = __ctm.config.sid;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", webhook, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let messageElement = document.getElementById('message');
            if (xhr.status == 200) {
                loader.style.display = 'none'; // Hide loader
                messageElement.innerHTML = successMessage;
                messageElement.style.color = "green";
                document.querySelector("form#phoneForm").style.display = "none";
                document.querySelector(".modal-content span").style.display = "none";
                setTimeout(closeModal, 3000);
                document.getElementById("phoneForm").reset();
            } else {
                loader.style.display = 'none'; // Hide loader
                messageElement.innerHTML = failMessage;
                messageElement.style.color = "red";
            }
            messageElement.style.display = "block";
        }
    }
    xhr.send("phoneNumber=" + phoneNumber + "&sid=" + sid);
}

// Initialize
injectModal();
setupModalEventListeners();
