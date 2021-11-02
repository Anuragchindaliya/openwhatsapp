window.onload = function () {
  // alert("loaded");
  // confirm("are you hacker");
  var input = document.querySelector("#link");
  var go = document.querySelector("#go");
  var errorMsg = document.querySelector("#errorMsg");
  input.focus();
  function checkLength(e) {
    if (e.target.value.length == 10) {
      input.style.border = "2px solid rgb(26, 196, 91)";
    }
  }
  //   input.addEventListener("change", ()=>{checkLength});

  function clipboardText() {
    navigator.clipboard
      .readText()
      .then((text) => {
        if (isNaN(text)) {
          if (
            confirm(
              `Please copy only number \nDo want to go with this:\n${text}`
            )
          ) {
            input.value = text;
          }
        } else {
          input.value = text;
          if (input.value.length == 10) {
            input.style.border = "2px solid rgb(26, 196, 91)";
          }
        }
      })
      .catch((err) => {
        input.value = "9811457143";
        errorMsg.innerHTML = `error in clip board`;
      });
  }
  clipboardText();
  window.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      m4wLink(input.value);
    }
  });
  go.addEventListener("click", () => {
    m4wLink(input.value);
  });
  function m4wLink(text) {
    if (text.length == 10) {
      window.location.replace(`https:wa.me/91${text}`);
    } else {
      if (
        confirm("number is not in correct format do you want to go with this")
      ) {
        window.location.replace(`https://wa.me/91${text}`);
        
      }
    }
  }
};
