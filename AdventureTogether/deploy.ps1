param(
    [string] $firebaseToken,
    [string] $firebaseProject,
    [string] $releaseMessage
)

$dir = Split-Path $MyInvocation.MyCommand.Path

Push-Location $dir

npm i -g firebase-tools

write-host "starting deploy...";

firebase --version;

firebase deploy --token $firebaseToken --project $firebaseProject;

write-host "deployment completed";

Pop-Location