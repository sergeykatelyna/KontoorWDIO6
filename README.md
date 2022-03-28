Preconditions: 
1) Node version 14 last, not higher
2) Python
3) Visual Studio Build Tool

Set up:
Run command: npm install 

Run command: npm test

Run using Selenoid:
1) D:\programs> .\cm_windows_386.exe selenoid start --vnc
1) D:\programs> .\cm_windows_386.exe selenoid-ui start
2) Run your tests against Selenoid like you do with regular Selenium hub:

Tests Endpoint
http://localhost:4444/wd/hub
3) If something does not work, you can easily check that Selenoid is running with opening status url:

Current Selenoid Status
http://localhost:4444/status
A successful request should return a JSON with browser usage statistics.

4) To open Selenoid UI navigate to the following page in your browser:

UI Default URL
http://localhost:8080/

