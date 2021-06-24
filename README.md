# Formio-survey

Create beautiful (Typeform inspired) surveys using Form.io.
Formio-survey will help you render even the most logic heavy / complex surveys.

![formio-survey](https://user-images.githubusercontent.com/48744933/123226880-576f4f80-d4d4-11eb-9795-5b73368332c3.gif)

## Installation

```cmd
npm install formio-survey
```

 or YARN

 ```cmd
yarn add formio-survey
```

Or just use directly with UNPKG

```html
<link rel='stylesheet' href='https://www.unpkg.com/formio-survey@1.0.1/dist/style.css'>
<script src="https://www.unpkg.com/formio-survey@1.0.1/dist/index.umd.js"></script>
```

If you are not using Formio already, import it and it's css dependencies before importing this library

```html
<script src='https://cdn.form.io/formiojs/formio.full.min.js'></script>
<link
  rel="stylesheet"
  href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
/>
<link 
  rel='stylesheet' 
  href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
>
<link 
  rel='stylesheet' 
  href='https://cdn.form.io/formiojs/formio.full.min.css'
>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
```

## Usage

Formio-survey uses Animate.css to bring to live your survey, you can  use any of the available animations

```js
formioSurvey.render({
  renderElement: document.getElementById("formio"),
  src: "https://zdzvmdwsyjiltzy.form.io/wellness",
  animations: {
    click: "pulse",
    next: "backOutDown",
    previous: "backInUp",
  },
});
```
