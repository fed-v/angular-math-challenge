/*******************************************/
/***            APP MODULE               ***/
/*******************************************/

var app = angular.module('mathChallenge', []);



/*******************************************/
/***            CONTROLLERS              ***/
/*******************************************/

app.controller('myFilterDemoCtrl', function($scope){
		
        
		// CONFIG DATA
		$scope.data = {
			skill: 1,
            firstNum: 0,
            secondNum: 0,
            required:false,
            wrong:false,
            correct:false,
            validating:false
		};
        
        
        // USER DATA
        $scope.user = {
            lives: 5,
            points: 0
        };
        
        
        // FUNCTION THAT RETURNS AN ARRAY TO USE ON NGREPEAT
        $scope.getNumber = function(num) {
            return new Array(num);   
        };
        
        
        // SET SKILL LEVEL ON BUTTON CLICK
        $scope.skillSelect = function (){
            
            switch(event.target.id){
                
                case "easy": $scope.data.skill = 1;
                        break;
                        
                case "normal": $scope.data.skill = 2;
                        break;
                        
                case "hard": $scope.data.skill = 3;
                        break;
                
            }
            
        }
        
        $scope.startGame = function (){
            
            //SHOW FORM
            $scope.data.validating = false;
            
            //RESET MESSAGES
            $scope.resetWarnings();
            
            //SET RANDOM VALUE BASED ON SKILL
            switch($scope.data.skill){
                
                case 1:     $scope.data.firstNum = Math.floor((Math.random() * 25) + 1);
                            $scope.data.secondNum = Math.floor((Math.random() * 25) + 1);
                            break;
                        
                case 2:     $scope.data.firstNum = Math.floor((Math.random() * 50) + 15);
                            $scope.data.secondNum = Math.floor((Math.random() * 50) + 15);
                            break;
                          
                            
                case 3:     $scope.data.firstNum = Math.floor((Math.random() * 120) + 50);
                            $scope.data.secondNum = Math.floor((Math.random() * 120) + 50);
                            break;
                                                        
            }
        }
        
        $scope.resetWarnings = function (){
            
            $scope.data.wrong = false;
            $scope.data.required = false;
            $scope.data.correct = false;
            $scope.data.answer = undefined;
            
        }
        
        
        $scope.validate = function (){            
            
            if($scope.myForm.answer.$valid){

                //HIDE FORM
                $scope.data.validating = true;
                
                if($scope.data.firstNum + $scope.data.secondNum == $scope.data.answer){
                    $scope.user.points += 10 *  $scope.data.skill;    // ADD POINTS 
                    $scope.data.required = false;
                    $scope.data.correct = true;
                }else{
                    $scope.user.lives -= 1;
                    $scope.data.required = false;
                    $scope.data.wrong = true;
                }
                
                
                // THESE SHOULD BE REPLACED WITHIN THE HTML
            }else if($scope.myForm.answer.$error.required){
                alert("Number Required!");
            }else if($scope.myForm.answer.$error.number){
                alert("Must be a number!");
            }else if($scope.myForm.answer.$error.max){
                alert("Number is too long!");
            }
           
        }
        
	}
);
