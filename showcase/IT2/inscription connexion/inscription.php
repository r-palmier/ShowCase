<?php
    try {
        $bdd = new PDO("mysql:host=localhost;dbname=showcase", "root");
    }
    catch(PDOException $e){
        echo $e->getMessage();
    }

	if(isset($_GET["inscription"])){
		echo "ok";
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Inscription</title>
	<meta charset="UTF-8"/>
	<link rel="stylesheet" type="text/css"  href="connexion.css">
</head>
<body>
	 <header>
		<img class="logo" src="logo.svg" alt="logo" draggable="false">
		<h2 class="titre"><label>Inscription</label></h2>
	</header>

    <div class="inscription_bg">
		<form action="" method="GET">
                
			<label for="pseudo">Pseudo : <br> 
			   <input class="z-text" type="text" name="pseudo" required>
			</label>
			<br><br>
			<label for="mdp">Mot de passe : <br> 
				<input class="z-text" type="password" name="password" required>
			</label>
			<input nmae="inscription" class="b_connexion" type="submit" id="b_principal" value="s'enregistrer">
		</form>

</div>

<a href="/connexion.html"><button class="b_retour">Retour</button></a>
   

</body>
</html>