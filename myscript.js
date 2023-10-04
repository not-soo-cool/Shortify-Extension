document.getElementById("id_Get").onclick = () => {
  chrome.runtime.sendMessage({method: "clear"}, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: getDocumentInfo
      },()=>{
        if (chrome.runtime.lastError) {
          document.getElementById("id_text").value = "Error: " + chrome.runtime.lastError.message;
        }
        else{
          chrome.runtime.sendMessage({method: "get"}, (response) => {
            document.getElementById("id_text").value = response.value;
          });
        }
      });
    });
  });
}


function getDocumentInfo(){
  let formData = [];
  let inputData = [];
  let selectData = [];
  let textData = [];
  let i1='';
  let f1='';
  let s1='';
  let t1='';
  let input = document.getElementsByTagName("input").length;
  const inputElements = document.querySelectorAll('input');
  let select = document.getElementsByTagName("select").length;
  let selectElements = document.querySelectorAll("select");
  let textarea = document.getElementsByTagName("textarea").length;
  let textElements = document.querySelectorAll("textarea");
  let form = document.getElementsByTagName("form").length;
  let formElements = document.querySelectorAll("form");
  // let links = document.getElementsByTagName("link");
  // let cssCount = 0;
  // let jsCount = 0;
  // for (let i = 0; i < links.length; i++){
  //   if (/\.css$/.test(links[i].href)) cssCount++;
  //   if (/\.js$/.test(links[i].href)) jsCount++;
  // }

  if(input > 0) {
    inputElements.forEach(element => {
      if(element.type != 'hidden'){
      const elementType = element.type;
      const elementValue = element.value;
      const elementText = element.placeholder;
      const elementName = element.name;
      const elementDisplay = element.display;
      const elementDisabled = element.disabled;
      // const elementRequired = element.required;
      // const elementAutocomplete = element.autocomplete;
      // const elementReadonly = element.readonly;
      // const elementPattern = element.pattern;
      // const elementSize = element.size;
      // const elementAccept = element.accept;
  
      i1 += "type=" + element.type + "\n" +
      "value=" + element.value + "\n" +
      "placeholder=" + element.placeholder + "\n" +
      "display=" + element.display + "\n" +
      "disabled=" + element.disabled + "\n" +
      "name=" + element.name + "\n" + "\n"
      // "required=" + element.required + "\n" +
      // "autocomplete=" + element.autocomplete + "\n" +
      // "readonly=" + element.readonly + "\n" +
      // "pattern=" + element.pattern + "\n" +
      // "size=" + element.size + "\n" +
      // "accept=" + element.accept + "\n"
  
      inputData.push({
        type: elementType,
        value: elementValue,
        placeholder: elementText,
        name: elementName,
        display: elementDisplay,
        disabled: elementDisabled,
        // required: elementRequired,
        // autocomplete: elementAutocomplete,
        // readonly: elementReadonly,
        // pattern: elementPattern,
        // size: elementSize,
        // accept: elementAccept,
      });
    }
    });
  }

  if(select > 0){
    selectElements.forEach(element => {
      const elementName = element.name;
      const elementRequired = element.required;
      const elementSize = element.size;
      const elementForm = element.form;
      // const elementOnchange = element.onchange;
      const elementValue = element.value;
      const elementLabel = element.label;
      const elementSelected = element.selected;
      const elementDisabled = element.disabled;
      const elementAutocomplete = element.autocomplete;
  
      s1 += "name=" + element.name + "\n" +
      "required=" + element.required + "\n" +
      "size=" + element.size + "\n" + 
      "form=" + element.form + "\n" + 
      // "onchange=" + element.onchange + "\n" + 
      "value=" + element.value + "\n" + 
      "label=" + element.label + "\n" + 
      "selected=" + element.selected + "\n" + 
      "disabled=" + element.disabled + "\n" + 
      "autocomplete=" + element.autocomplete + "\n"
  
      selectData.push({
        name: elementName,
        required: elementRequired,
        size: elementSize,
        form: elementForm,
        // onchange: elementOnchange,
        value: elementValue,
        label: elementLabel,
        selected: elementSelected,
        disabled: elementDisabled,
        autocomplete: elementAutocomplete,
      });
    });
  }

  if(textarea > 0) {
    textElements.forEach(element => {
      const elementName = element.name;
      const elementRequired = element.required;
      const elementReadonly = element.readonly;
      const elementForm = element.form;
      const elementDisabled = element.disabled;
      const elementAutocomplete = element.autocomplete;
      const elementPlaceholder = element.placeholder;
      const elementAutocorrect  = element.autocorrect;
      const elementWrap  = element.wrap;
  
      t1 += "name=" + element.name + "\n" +
      "required=" + element.required + "\n" +
      "readonly=" + element.readonly + "\n" + 
      "form=" + element.form + "\n" + 
      "disabled=" + element.disabled + "\n" + 
      "autocomplete=" + element.autocomplete + "\n" + 
      "placeholder=" + element.placeholder + "\n" + 
      "autocorrect=" + element.autocorrect + "\n" +
      "wrap=" + element.wrap + "\n"
  
      textData.push({
        name: elementName,
        required: elementRequired,
        readonly: elementReadonly,
        form: elementForm,
        disabled: elementDisabled,
        autocomplete: elementAutocomplete,
        placeholder: elementPlaceholder,
        autocorrect : elementAutocorrect,
        wrap: elementWrap,
      });
    });
  }

  if(form > 0) {
    formElements.forEach(element => {
      const elementAction = element.action;
      const elementClassName = element.className;
      const elementMethod = element.method;
      const elementTarget = element.target;
      const elementAutocomplete = element.autocomplete;
      const elementname = element.name;
      const elementDisabled = element.disabled;
      // const elementOnsubmit = element.onsubmit;
      // const elementOnreset = element.onreset;
  
      f1 += 
      "action=" + element.action + "\n" +
      "className=" + element.className + "\n" +
      "method=" + element.method + "\n" +
      "target=" + element.target + "\n" +
      "autocomplete=" + element.autocomplete + "\n" +
      "name=" + element.name + "\n" +
      "disabled=" + element.disabled + "\n" +
      // "onsubmit=" + element.onsubmit + "\n" +
      // "onreset=" + element.onreset + "\n"
  
      formData.push({
        action: elementAction,
        className: elementClassName,
        method: elementMethod,
        target: elementTarget,
        autocomplete: elementAutocomplete,
        name: elementname,
        disabled: elementDisabled,
        // onsubmit: elementOnsubmit,
        // onreset: elementOnreset,
      })
    });
  }

  let message = 
                "input=" + input + "\n" +
                "select=" + select + "\n" +
                "textarea=" + textarea + "\n" +
                "form=" + form + "\n" +
                "InputElements=" + i1 + "\n" +
                "FormElements=" + f1 + "\n" +
                "SelectElements=" + s1 + "\n" +
                "TextElements=" + t1 + "\n"

  chrome.runtime.sendMessage({method: "set", value: message}, () => {
  });
}