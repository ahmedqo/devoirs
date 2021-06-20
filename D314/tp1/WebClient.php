<?php
$WebClient = new SoapClient("http://localhost:8080/tutorial/SimpleCalculator?wsdl");
$results = $WebClient->decomposer(array("number"=>642000));
echo "decomposition entier: ". implode(",", $results->return);
?>