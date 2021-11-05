
window.onload = function () {
  // alert("loaded");
  // confirm("are you hacker");
  var input = document.querySelector("#link");
  var go = document.querySelector("#go");
  var errorMsg = document.querySelector("#errorMsg");
  var dialCodeInput = document.querySelector("#dial-code");
  var textMsg = document.querySelector("#textMsg");
  var dialCodeListValue = document.querySelector("#countryCode");

  input.focus();

  input.addEventListener("input",checkLength);
  function checkLength(e) {
    if (e.target.value.length == 10) {
      input.style.border = "2px solid rgb(26, 196, 91)";
    }else{
      input.style.border = "2px solid rgb(209, 0, 0)";
    }
  }
  
  //   input.addEventListener("change", ()=>{checkLength});

  function clipboardText() {
    navigator.clipboard
      .readText()
      .then((text) => {
        //remove space
        var number = text.replace(/\s/g, "");
        var countryCode = "+91";
        

        
        if (text[0] === "+") {
          //extract country code
          countryCode = number.substr(0, number.length-10);

          //extract mobile number
          number = number.substr(countryCode.length, 10);
        }else if(!isNaN(number) && number.length >10){
          
         countryCode = `+${number.substr(0,number.length-10)}`;
         console.log(countryCode)
        }
        // console.log(countryCode, number);
        if (isNaN(number)) {
          if (
            confirm(
              `Please copy only number \nDo you want to insert it into message :\n${text}`
            )
          ) {
            // input.value = text;
            textMsg.value = number;
            input.focus();
          }
        } else {
          dialCodeInput.value = countryCode;
          dialCodeListValue.value = countryCode;
          input.value = number.substring(number.length-10);
          if (input.value.length == 10) {
            input.style.border = "2px solid rgb(26, 196, 91)";
          }
        }
      })
      .catch((err) => {
        input.value = `${err}`;
        errorMsg.innerHTML = `error in clip board`;
      });
  }
  if (navigator.clipboard) {
    clipboardText();
  } else {
    errorMsg = "Clipboard access is not supportable in your device";
  }

  window.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      if(dialCodeListValue.value){
        console.log("dial Code value"+dialCodeListValue.value);
      }else{
        console.log(dialCodeListValue);
      }
      
      m4wLink(input.value,textMsg.value,dialCodeListValue.value);
    }
  });
  go.addEventListener("click", () => {
    m4wLink(input.value,textMsg.value,dialCodeListValue.value);
  });
  function m4wLink(text,msg,dialCode) {
    // console.log(dialCode);
    if (text.length == 10) {
      // window.location.replace(`https://wa.me/91${text}`);
      
      window.open(`https://wa.me/${dialCode}${text}?text=${msg}`, "_blank");
    } else {
      if (
        confirm("number is not in correct format do you want to go with this")
      ) {
        // window.location.replace(`https://wa.me/91${text}`);
        window.open(`https://wa.me/${dialCode}${text}?text${msg}`, "_blank");
      }
    }
  }
};
