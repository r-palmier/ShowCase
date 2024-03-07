<?php
$texte = "Cet appareil photo a un objectif de 18 Megapixels.";

function insert_texte ($id, $texte, $id_police = 0) {
        try {
            $bdd = new PDO("mysql:host=localhost;dbname=showcase", "root");
        }
        catch(PDOException $e){
            echo $e->getMessage();
        }

        $sql = "INSERT INTO text_liste(ID, personaliser_id, propriétés) VALUES ($id, $id_police, '$texte')";
        $req = $bdd->prepare($sql);
        $req->execute();
    }

    insert_texte(1, $texte, 0);

?>