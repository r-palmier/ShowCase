<html>
<head>
    <title>Connexion</title>
    <link rel="stylesheet" type="text/css"  href="./css/liste_site.css">
</head>
</html>



<?php
try
{
	$db = new PDO('mysql:host=localhost;dbname=showcase;charset=utf8', 'root', '');
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}



$pseudo = $_POST['pseudo'];
$mdp = $_POST['mdp_user'];

// affiche les noms des différents sites appartenant à la personne

$recup_site = 'SELECT nom FROM site WHERE proprietaire = (SELECT id FROM user WHERE pseudo = :pseudo)';

$prepare_site = $db->prepare($recup_site);
$prepare_site->execute([
    'pseudo' => $pseudo,
]);

$liste_site = $prepare_site->fetchAll();

// recupération id 
$recup_id = 'SELECT id FROM user WHERE pseudo = :pseudo';
$prepare_id = $db->prepare($recup_id);
$prepare_id->execute([
    'pseudo' => $pseudo,
]);

$liste_id = $prepare_id->fetchAll();

echo('<body>');
echo('<form class ="selection" action="creer_site.php" method="post">
            <div>
            <label for="name"></label>
            <input type="hidden" id="name" name="pseudo" value ='.($pseudo).'>
        </div>
        <div>
        <label for="id"></label>
        <input type="hidden" id="id" name="id" value ='.($liste_id[0]['id']).'
    </div>
    <div>
    <label for="mdp-user"></label>
    <input type="hidden" id="mdp_user" name="mdp_user" value ='.($mdp).'
</div>');
if(count($liste_site) !== 0){
    echo ('<div class = sous-titre> vos site </div>');
    foreach($liste_site as $site){
        echo('<div class="button">
        <button type="submit" name ='.$site['nom'].'>'.$site['nom'].'</button>
        </div>');
    }
}
else{       
    echo('<div class ="sous-titre_2"> Commencez avec une template pré-faite </div>'.'<br>');
    echo('<div class="button">
        <button type="submit" name = Template >Template 1</button>
        </div>');
}
echo('</form>');
echo('</body>');
?>