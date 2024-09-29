// Configuration for multiple button selectors and webhook URL
const buttonSelectors = [`a[href*="wa.me"]`, `.open-modal`, `#triggerModal`]; // Multiple selectors to trigger the modal
const webhook = "https://webhook.com"; // Your webhook URL

// Detect language based on URL
let language = 'he'; // Default to Hebrew
const url = window.location.href;

if (url.includes('/he')) {
    language = 'he'; // Hebrew
} else if (url.includes('/fr')) {
    language = 'fr'; // French
} else if (url.includes('tamir-rental.com') || url.includes('/en')) {
    language = 'en'; // English
}

// Configuration based on language
const texts = {
    he: {
        title: "אנא הזינו נייד וניצור עמכם קשר ב-Whatsapp",
        successMessage: "תודה, שלחנו לכם הודעה לוואטסאפ",
        failMessage: "משהו השתבש, אנא בדקו את המספר ונסו שוב",
        inputPlaceholder: "אנא הזינו מספר טלפון",
        buttonText: "דברו איתי!",
        direction: "rtl" // Hebrew needs RTL direction
    },
    en: {
        title: "Please enter your phone number and we will contact you via Whatsapp",
        successMessage: "Thank you, we have sent you a message to Whatsapp",
        failMessage: "Something went wrong, please check the number and try again",
        inputPlaceholder: "Please enter your phone number",
        buttonText: "Contact me!",
        direction: "ltr" // English needs LTR direction
    },
    fr: {
        title: "Veuillez entrer votre numéro de téléphone et nous vous contacterons via Whatsapp",
        successMessage: "Merci, nous vous avons envoyé un message sur Whatsapp",
        failMessage: "Une erreur s'est produite, veuillez vérifier le numéro et réessayer",
        inputPlaceholder: "Veuillez entrer votre numéro de téléphone",
        buttonText: "Contactez-moi!",
        direction: "ltr" // French needs LTR direction
    }
};

// Set the texts and direction based on the detected language
const { title, successMessage, failMessage, inputPlaceholder, buttonText, direction } = texts[language];

// Country phone prefixes (alphabetically ordered by country)
const phonePrefixes = [
    { country: "Afghanistan", code: "+93" },
    { country: "Albania", code: "+355" },
    { country: "Algeria", code: "+213" },
    { country: "Andorra", code: "+376" },
    { country: "Angola", code: "+244" },
    { country: "Argentina", code: "+54" },
    { country: "Armenia", code: "+374" },
    { country: "Australia", code: "+61" },
    { country: "Austria", code: "+43" },
    { country: "Azerbaijan", code: "+994" },
    { country: "Bahrain", code: "+973" },
    { country: "Bangladesh", code: "+880" },
    { country: "Belarus", code: "+375" },
    { country: "Belgium", code: "+32" },
    { country: "Belize", code: "+501" },
    { country: "Benin", code: "+229" },
    { country: "Bhutan", code: "+975" },
    { country: "Bolivia", code: "+591" },
    { country: "Bosnia and Herzegovina", code: "+387" },
    { country: "Botswana", code: "+267" },
    { country: "Brazil", code: "+55" },
    { country: "Bulgaria", code: "+359" },
    { country: "Burkina Faso", code: "+226" },
    { country: "Cambodia", code: "+855" },
    { country: "Cameroon", code: "+237" },
    { country: "Canada", code: "+1" },
    { country: "Chad", code: "+235" },
    { country: "Chile", code: "+56" },
    { country: "China", code: "+86" },
    { country: "Colombia", code: "+57" },
    { country: "Congo", code: "+242" },
    { country: "Costa Rica", code: "+506" },
    { country: "Croatia", code: "+385" },
    { country: "Cuba", code: "+53" },
    { country: "Cyprus", code: "+357" },
    { country: "Czech Republic", code: "+420" },
    { country: "Denmark", code: "+45" },
    { country: "Dominican Republic", code: "+1" },
    { country: "Ecuador", code: "+593" },
    { country: "Egypt", code: "+20" },
    { country: "El Salvador", code: "+503" },
    { country: "Estonia", code: "+372" },
    { country: "Finland", code: "+358" },
    { country: "France", code: "+33" },
    { country: "Georgia", code: "+995" },
    { country: "Germany", code: "+49" },
    { country: "Ghana", code: "+233" },
    { country: "Greece", code: "+30" },
    { country: "Hungary", code: "+36" },
    { country: "Iceland", code: "+354" },
    { country: "India", code: "+91" },
    { country: "Indonesia", code: "+62" },
    { country: "Iran", code: "+98" },
    { country: "Iraq", code: "+964" },
    { country: "Ireland", code: "+353" },
    { country: "Israel", code: "+972" },  // Israel prefix
    { country: "Italy", code: "+39" },
    { country: "Jamaica", code: "+1" },
    { country: "Japan", code: "+81" },
    { country: "Jordan", code: "+962" },
    { country: "Kazakhstan", code: "+7" },
    { country: "Kenya", code: "+254" },
    { country: "Kuwait", code: "+965" },
    { country: "Latvia", code: "+371" },
    { country: "Lebanon", code: "+961" },
    { country: "Lithuania", code: "+370" },
    { country: "Luxembourg", code: "+352" },
    { country: "Malaysia", code: "+60" },
    { country: "Malta", code: "+356" },
    { country: "Mexico", code: "+52" },
    { country: "Monaco", code: "+377" },
    { country: "Mongolia", code: "+976" },
    { country: "Morocco", code: "+212" },
    { country: "Nepal", code: "+977" },
    { country: "Netherlands", code: "+31" },
    { country: "New Zealand", code: "+64" },
    { country: "Nigeria", code: "+234" },
    { country: "Norway", code: "+47" },
    { country: "Oman", code: "+968" },
    { country: "Pakistan", code: "+92" },
    { country: "Panama", code: "+507" },
    { country: "Peru", code: "+51" },
    { country: "Philippines", code: "+63" },
    { country: "Poland", code: "+48" },
    { country: "Portugal", code: "+351" },
    { country: "Qatar", code: "+974" },
    { country: "Romania", code: "+40" },
    { country: "Russia", code: "+7" },
    { country: "Saudi Arabia", code: "+966" },
    { country: "Serbia", code: "+381" },
    { country: "Singapore", code: "+65" },
    { country: "Slovakia", code: "+421" },
    { country: "Slovenia", code: "+386" },
    { country: "South Africa", code: "+27" },
    { country: "South Korea", code: "+82" },
    { country: "Spain", code: "+34" },
    { country: "Sri Lanka", code: "+94" },
    { country: "Sudan", code: "+249" },
    { country: "Sweden", code: "+46" },
    { country: "Switzerland", code: "+41" },
    { country: "Syria", code: "+963" },
    { country: "Taiwan", code: "+886" },
    { country: "Thailand", code: "+66" },
    { country: "Turkey", code: "+90" },
    { country: "Uganda", code: "+256" },
    { country: "Ukraine", code: "+380" },
    { country: "United Arab Emirates", code: "+971" },
    { country: "United Kingdom", code: "+44" },
    { country: "United States", code: "+1" },
    { country: "Venezuela", code: "+58" },
    { country: "Vietnam", code: "+84" },
    { country: "Yemen", code: "+967" },
    { country: "Zimbabwe", code: "+263" }
];

// Create the country code options for the select dropdown
function createPhonePrefixOptions() {
    return phonePrefixes
        .map(prefix => `<option value="${prefix.code}" ${language === 'he' && prefix.code === '+972' ? 'selected' : ''}>${prefix.country} (${prefix.code})</option>`)
        .join('');
}

// Set the default phone prefix to +972 if the language is Hebrew
function setDefaultPrefix() {
    const phonePrefixSelect = document.getElementById('phonePrefix');
    if (language === 'he') {
        phonePrefixSelect.value = '+972'; // Default to Israel if language is Hebrew
    }
}

// Inject modal into the page
function injectModal() {
    const modalHTML = `
        <div id="phoneModal" class="modal" style="display: none;">
            <div class="modal-content" style="direction: ${direction};">
                <div class="loaderModal" style="display: none;"></div>
                <span>${title}</span>
                <form id="phoneForm">
                    <div class="input-container">
                        <div id="phoneContainer">
                            <select id="phonePrefix" name="phonePrefix" required>
                                ${createPhonePrefixOptions()}
                            </select>
                            <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="${inputPlaceholder}" required>
                        </div>
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
                #phoneModal div#phoneContainer {
                    direction: ltr;
                }
                #phoneModal input[type="tel"] {
                    width: 68%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    display: inline-block;
                    border: 1px solid #ccc;
                    box-sizing: border-box;
                    text-align: center;
                    font-size: 1em;
                    border-radius: 15px;
                }
                #phoneModal select#phonePrefix {
                    width: 29%;
                    padding: 12px 5px;
                    margin: 8px 0;
                    display: inline-block;
                    border: 1px solid #ccc;
                    box-sizing: border-box;
                    text-align: center;
                    font-size: 1em;
                    border-radius: 15px;
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
    // Iterate over the multiple selectors
    buttonSelectors.forEach(selector => {
        const buttons = document.querySelectorAll(selector); // Get all elements matching this selector
        buttons.forEach(button => {
            button.addEventListener('click', openModal); // Add event listener to each matching element
        });
    });

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

    // Set default phone prefix based on language
    setDefaultPrefix();
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
    const phonePrefix = document.getElementById('phonePrefix').value;
    let sid = "";
    if (typeof __ctm !== 'undefined' && __ctm !== null && __ctm.config && __ctm.config.sid !== null) {
        sid = __ctm.config.sid;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", webhook, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let messageElement = document.querySelector('.modal-content #message');
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
    xhr.send("phonePrefix=" + encodeURIComponent(phonePrefix.replace("+","")) + "&phoneNumber=" + encodeURIComponent(phoneNumber) + "&sid=" + encodeURIComponent(sid));
}

// Initialize
injectModal();
setupModalEventListeners();
