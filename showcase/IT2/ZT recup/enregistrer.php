<?php
    function save_elem($id, $type){
        if (isset($_COOKIE["elements"]) == NULL){
            setcookie("elements", "");
            $elements = [];
            echo "cookie non set";
        } else {
            print_r($elements);
            // $elements = explode("_", $_COOKIE["elements"]);
            setcookie("elements", "");
        }
        $array = [
            "type" => $type,
        ];

        $elements[][$id] = implode($array);

        print_r ($elements);
        echo "<BR>";


        $elements = implode("_", $elements);
        //     setcookie("elements", $elements);
        return $elements;
    }
    save_elem(1, "texte");
    // print_r($_COOKIE);
    // var_dump($_COOKIE["elements"]);
    echo "<br>";
    // echo explode("_", $_COOKIE["elements"]);
?>