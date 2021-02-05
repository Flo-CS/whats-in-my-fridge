robocopy . "../Whats in my fridge cleaned" /e /xd "node_modules" /xf ".env" 
#Compress-Archive -DestinationPath '../Whats in my fridge cleaned.zip' -Force -Path '../Whats in my fridge cleaned' -Confirm
#Remove-Item -Path '../Whats in my fridge cleaned' -Confirm -Recurse -Force
Pause