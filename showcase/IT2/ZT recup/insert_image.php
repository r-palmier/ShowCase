<?php
function insert_image ($id, $chemin, $propriétés) {
        try {
            $bdd = new PDO("mysql:host=localhost;dbname=showcase", "root");
        }
        catch(PDOException $e){
            echo $e->getMessage();
        }


        $sql = "INSERT INTO image_liste(ID, propriétés, chemin) VALUES ($id, $propriétés, $chemin)";
        $req = $bdd->prepare($sql);
        $req->execute();
    }

    insert_image (1, 2, 0);

?>