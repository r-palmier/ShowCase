<?php
    if(isset($_FILES['fileI'])) {
        // print_r($_FILES);

        $fileName = $_FILES["fileI"]['name'];
        $fileType = $_FILES['fileI']['type'];
        $fileTmpName = $_FILES['fileI']['tmp_name'];
        $fileError = $_FILES['fileI']['error'];
        $fileSize = $_FILES['fileI']['size'];

        $fileExt = explode(".", $fileName);
        $fileActualExt = strtolower(end($fileExt));
        
        $allowed = array("jpg", "jpeg", "png");

        if(in_array($fileActualExt, $allowed)) {
            if ($fileError === 0) {
                $fileNameNew = uniqid('', true).".".$fileActualExt;

                $fileDestination = '../Images/'.$fileNameNew;

                move_uploaded_file($fileTmpName, $fileDestination);

                print($fileDestination);
            } else {
                print("Il y a eu une erreur en uploadant le fihcier ! Code : $fileError");
            }
        } else {
            print("Vous ne pouvez pas uploader un fichier de ce type !");
        }
    } else {
        print("Erreur");
    }
?>