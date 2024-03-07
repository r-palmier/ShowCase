<?php
    function save_elem($id, $type){
        $new = [
            "type" => $type,
            "prop" => "je suis entrain de coder"
        ];
        $chaine = implode("_", $new);
        echo $chaine, "<br>";
        $tab = explode("_", $chaine);
        var_dump($tab);
    }
    save_elem(1961, "text");
?>