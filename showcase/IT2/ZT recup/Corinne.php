<html>
	<head>
        <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
		<script>
			function Select(id) {
				document.getElementById(id).select()
                console.log(id);
			}
			
			function Connect() {
				var login = document.getElementById("Login").value;
				var password = document.getElementById("Password").value;
                console.log(login);
                $.ajax({
                    type: "POST",
                    url: "Corinne.php",
                    data: {login: login, password: password}
                });
                variable_a_passer = login;
                $.post("Corinne.php", {variable : variable_a_passer},function data(reply){});
			}
		</script>
		<style>
			#Connect_Area {box-shadow: 7px 0px 10px 5px rgba(119, 119, 119, 0.7);
							-moz-box-shadow: 7px 0px 10px 5px rgba(119, 119, 119, 0.7);
							-webkit-box-shadow: 7px 0px 10px 5px rgba(119, 119, 119, 0.7);
							   padding: 15px;
							background: #eeeeee;
							border: 3px solid #bbbbbb;
							border-radius: 50px;
							-moz-border-radius: 50px;
							-webkit-border-radius: 50px;
							position:relative;
							top:5px;}
		</style>
	</head>
    <?php
        if (isset($_GET['login'])){
            echo $_GET['login'];
        } else {
            echo "ok";
        }
        if (isset($_POST['login'])){
            $Variable = $_POST['login'];
            echo $Variable;
        }
		
    ?>
	
	<body>
		<center><div id="Connect_Area">
			<span style="float:left"><input type="Button" value="S'inscrire" onClick="Subscribe()"></span>
			<span style="float:right">
                <input id="Login" type="" value="Login" onClick="Select(this.id)">
                <input id="Password" type="Password" value="Passeword" onClick="Select(this.id)">
                <input type="Button" value="Connexion" onClick="Connect()">
        </span>
		<br>
		</div></center>
	</body>
</html>