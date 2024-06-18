window.addEventListener("load", function() {
  const elements = document.querySelectorAll(".header-container *");
  let i = 0;

  function emergeElement() {
    if (i < elements.length) {
      elements[i].style.opacity = 1;
      i++;
      setTimeout(emergeElement, 200); // adjust the delay as needed
    }
  }

  emergeElement();
});

document.addEventListener('mousemove', function(e) {
  const daisy = document.getElementById('daisy');
  daisy.classList.remove('hidden');
  daisy.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
});

const daisy = document.getElementById('daisy');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateDaisyPosition() {
  daisy.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  requestAnimationFrame(updateDaisyPosition);
}

updateDaisyPosition();

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const form = event.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      form.reset();
      document.getElementById('response-message').innerText = 'Thank you for your message!';
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          document.getElementById('response-message').innerText = data["errors"].map(error => error["message"]).join(", ");
        } else {
          document.getElementById('response-message').innerText = 'Oops! There was a problem submitting your form.';
        }
      });
    }
  }).catch(error => {
    document.getElementById('response-message').innerText = 'Oops! There was a problem submitting your form.';
  });
});
