export const mailTemplate = ({ title, content}: { title?: String, content }) =>
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        a{
font-weight: bold ;
color: blue;
        }
    </style>
</head>
<body>
${title?"<h2>"+title+"</h2>":""}
<main>
    ${content}
</main>
</body>
</html>`;

