window.onload = function () {
  var input = document.querySelector("#link");
  var go = document.querySelector("#go");
  var errorMsg = document.querySelector("#errorMsg");
  var dialCodeInput = document.querySelector("#dial-code");
  var textMsg = document.querySelector("#textMsg");
  var dialCodeListValue = document.querySelector("#countryCode");
  var clearText = document.querySelector("#clearText");
  var clearNumber = document.querySelector("#clearNumber");

  input.focus();

  input.addEventListener("input", checkLength);
  function checkLength(e) {
    if (e.target.value.length == 10) {
      input.style.border = "2px solid rgb(26, 196, 91)";
    } else {
      input.style.border = "2px solid rgb(209, 0, 0)";
    }
  }

  function clipboardText() {
    navigator.clipboard
      .readText()
      .then((text) => {
        //remove space
        var number = text.replace(/\s/g, "");
        var countryCode = "+91"; //with default value

        // if number containing the countryCode with plus so
        if (text[0] === "+") {
          //extract country code
          countryCode = number.substr(0, number.length - 10);
          //extract mobile number
          number = number.substr(countryCode.length, 10);
        } else if (!isNaN(number) && number.length > 10) {
          // if users copied number without plus then extract the countryCode only
          countryCode = `+${number.substr(0, number.length - 10)}`;
          console.log("country code ", countryCode);
        }

        // console.log(countryCode, number);
        if (isNaN(number)) {
          // if user copied the text(string) then we will inserting that in textarea
          if (
            confirm(
              `Please copy only number \nDo you want to insert it into message :\n${text}`
            )
          ) {
            // input.value = text;
            textMsg.value = text;
            input.focus();
            var setMsg = text;
            var setContact = "";
            var setCountryCode = countryCode;
            if (localStorage.getItem("openwhatsup")) {
              var obj = JSON.parse(localStorage.getItem("openwhatsup"));
              setContact = obj.contact;
              setCountryCode = obj.countryCode;
            }
            input.value = setContact;
            dialCodeInput.value = setCountryCode;
            localStorage.setItem(
              "openwhatsup",
              JSON.stringify({
                msg: setMsg,
                contact: setContact,
                countryCode: setCountryCode,
              })
            );
            if (input.value.length == 10) {
              input.style.border = "2px solid rgb(26, 196, 91)";
            }
          }
        } else {
          //user copied the number

          // setting value in input fields
          dialCodeInput.value = countryCode;
          dialCodeListValue.value = countryCode;

          input.value = number.substring(number.length - 10);
          if (input.value.length == 10) {
            input.style.border = "2px solid rgb(26, 196, 91)";
          }
          var setCountryCode = countryCode;
          var setContact = input.value;
          var setMsg = textMsg.value;
          if (localStorage.getItem("openwhatsup")) {
            setMsg = JSON.parse(localStorage.getItem("openwhatsup")).msg;
          }
          textMsg.value = setMsg;
          localStorage.setItem(
            "openwhatsup",
            JSON.stringify({
              msg: setMsg,
              contact: setContact,
              countryCode: setCountryCode,
            })
          );
        }
      })
      .catch((err) => {
        input.value = `${err}`;
        errorMsg.innerHTML = `error in clip board`;
      });
  }

  if (navigator.clipboard) {
    setTimeout(permisionCheck, 100);

    function permisionCheck() {
      navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
        if (result.state == "granted" || result.state == "prompt") {
          clipboardText();
        } else {
          console.log("permission is denied");
          alert("Give permission of clipboard text");
        }
      });
    }
  } else {
    errorMsg = "Clipboard access is not supportable in your device";
  }

  window.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      if (dialCodeListValue.value) {
        console.log("dial Code value" + dialCodeListValue.value);
      } else {
        console.log(dialCodeListValue);
      }

      m4wLink(input.value, textMsg.value, dialCodeInput.value);
    }
  });

  //open whatsapp number
  go.addEventListener("click", () => {
    m4wLink(input.value, textMsg.value, dialCodeInput.value);
  });
  function m4wLink(number, msg, dialCode) {
    // console.log(dialCode);
    if (number.length == 10) {
      // window.location.replace(`https://wa.me/91${text}`);

      window.open(`https://wa.me/${dialCode}${number}?text=${msg}`, "_blank");
    } else {
      if (
        confirm("number is not in correct format do you want to go with this")
      ) {
        // window.location.replace(`https://wa.me/91${text}`);
        window.open(`https://wa.me/${dialCode}${number}?text${msg}`, "_blank");
      }
    }
  }

  clearText.addEventListener("click", () => {
    textMsg.value = "";
  });
  clearNumber.addEventListener("click",()=>{
    input.value = "";
  })
};
