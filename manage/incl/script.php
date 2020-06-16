<div class="loader :flash"></div>
<script src="js/kule.urbrowser.min.js" id="urbrowser" data-domain="<?=$_SERVER['HTTP_HOST'];?>"></script>
<?php
echo "\t\t"; getUpdatedHtmlTag(['js/jquery-3.4.0.min.js', 'js/jquery-3.4.0.js']);
echo "\t\t"; getUpdatedHtmlTag(['js/vue.min.js', 'js/vue.js']);
echo "\t\t"; getUpdatedHtmlTag(['js/shim.min.js', 'js/shim.min.js']);
echo "\t\t"; getUpdatedHtmlTag(['js/xlsx.full.min.js', 'js/xlsx.full.min.js']);
echo "\t\t"; getUpdatedHtmlTag(['js/backend.min.js', 'js/backend.js']);
echo "\n";
?>
