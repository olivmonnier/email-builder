import Inky from 'inky/lib/inky';
import juice from 'juice/client';
import css from 'foundation-emails/dist/foundation-emails.css';

const inky = new Inky();

const $input = document.getElementById('input');
const $preview = document.getElementById('preview');
const $output = document.getElementById('output');

const layout = `<!-- Emails use the XHTML Strict doctype -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="https://www.w3.org/1999/xhtml">
<head>
  <!-- The character set should be utf-8 -->
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width"/>
  <style type="text/css">
    <!-- CSS -->
  </style>
</head>
<body>
  <table class="body" data-made-with-foundation>
    <tr>
      <td class="float-center" align="center" valign="top">
        <center>
          <!-- HTMLCONTENT -->
        </center>
      </td>
    </tr>
  </table>
</body>
</html>
`;

$input.addEventListener('change', function(e) {
  const converted = inky.releaseTheKraken(e.target.value);
  let content = layout
    .replace('<!-- HTMLCONTENT -->', converted)
    .replace('<!-- CSS -->', css);
  
  content = juice(content);

  const doc = $preview.contentDocument? $preview.contentDocument: $preview.contentWindow.document;
  doc.documentElement.innerHTML = content;

  $output.innerHTML = Prism.highlight(content, Prism.languages.markup, 'markup')
});

document.addEventListener("DOMContentLoaded", function(){
  $input.dispatchEvent(new Event('change', { 'bubbles': true }))
})
