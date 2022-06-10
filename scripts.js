class Validator {

    constructor() {
      this.validations = [
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',
        'data-required',
        'data-password-validate',
      ]
    }

    validate(form) {
  
      let currentValidations = document.querySelectorAll('form .error-validation');
  
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      let inputs = form.getElementsByTagName('input');

      let inputsArray = [...inputs];
  
      inputsArray.forEach(function(input, obj) {
  
        for(let i = 0; this.validations.length > i; i++) {
          if(input.getAttribute(this.validations[i]) != null) {

            let method = this.validations[i].replace("data-", "").replace("-", "");
  
            let value = input.getAttribute(this.validations[i])
  
            this[method](input,value);
  
          }
        }
  
      }, this);
  
    }
  
    minlength(input, minValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
  
      if(inputLength < minValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    maxlength(input, maxValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `Limite de caracteres excedido. Utilize até ${maxValue}!`;
  
      if(inputLength > maxValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    onlyletters(input) {
  
      let re = /^[A-Za-z]+$/;;
  
      let inputValue = input.value;
  
      let errorMessage = `Utilize apenas letras neste campo`;
  
      if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
      }
    }

    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
  
      let errorMessage = `Insira um e-mail no padrão everymind@email.com`;
  
      if(!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
  
    }
    
    required(input) {
  
      let inputValue = input.value;
  
      if(inputValue === '') {
        let errorMessage = `Preenchimento obrigatório`;
        this.printMessage(input, errorMessage);
      }
  
    }

    passwordvalidate(input) {
  
      let charArr = input.value.split("");
      let uppercases = 0;
      let numbers = 0;
  
      for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if(!isNaN(parseInt(charArr[i]))) {
          numbers++;
        }
      }
  
      if(uppercases === 0 || numbers === 0) {
        let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  
    printMessage(input, msg) {
    
      let errorsQty = input.parentNode.querySelector('.error-validation');
  
      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
  
        template.textContent = msg;
    
        let inputParent = input.parentNode;
    
        template.classList.remove('template');
    
        inputParent.appendChild(template);
      }
  
    }
  
    cleanValidations(validations) {
      validations.forEach(el => el.remove());
    }
  
  }
  
  let form = document.getElementById('register-form');
  let submit = document.getElementById('btn-submit');
  
  let validator = new Validator();
  
  submit.addEventListener('click', function(e) {
    e.preventDefault();
  
    validator.validate(form);
  });