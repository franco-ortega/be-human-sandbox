// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');


// SUMMARY
// The timestamps for the start time is retrieved when the window opens because of the "*"" in the activationEvents section of the package.json.
// The pop-ups begin when the individual commands are called.

// setInterval takes in a function and a time interval/duration
// setInterval(() => {
//		~~~~~function code~~~~~
// }, interval);


// No idea what this @param thing does.
/**
 * @param {vscode.ExtensionContext} context
 */


 // Function is activated when window opens because of the "*"" in the activationEvents section of the package.json.
function activate(context) {
	// Variable to hold time duration for setInterval
	const runTime = 10000;

	// Retrieves timestamp when this function is activated
	const startTime = new Date();

	//Converts start time to local time
	const localTime = startTime.toLocaleTimeString();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	console.log('Congratulations, your extension "sandbox" is now active!');
	console.log(`This is the timestamp: ${startTime}`);
	console.log(`This is the start time: ${localTime}`);



	// INDIVIDUAL COMMAND BLOCKS BELOW HERE

	// COMMAND 1: sandbox.trackTimeNoOption
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// Upon activation, this command displays one pop-up (without buttons) at the bottom of the window. Then it displays two pop-ups that repeat based on the duration of the runTime variable (set on line 25).
	let disposable1 = vscode.commands.registerCommand('sandbox.trackTimeNoOption', function () {

		// The code you place here will be executed every time this command is executed
		vscode.window.showInformationMessage(`You started this coding session at ${localTime}.`);
		
		// This code will execute repeatedly based on the timing of setInterval (runTime variable on line 70).
		setInterval(() => {

			// Retrieves a new end time every time setInterval runs (based on runTime variable)
			const endTime = new Date();

			// Converts the endTime from milliseconds to seconds
			const timeSeconds = (endTime - startTime) / 1000;

			// Rounds the timeSeconds
			const roundedSeconds = Math.round(timeSeconds)
			

			// Display a message box to the user
			// Display two separate pop-ups at the same time. This happens after the runTime duration and repeats based on the runTime duration.
			vscode.window.showInformationMessage(`You started this coding session at ${localTime}.`);
			vscode.window.showInformationMessage(`You have been coding for ${roundedSeconds} seconds. Take 7 deep breaths`);

		// runTime is how often setInterval runs and displays the pop-ups inside.
		}, runTime)
		
	})

	// This is important. The "disposable1" variable created on line 40 needs to be pushed into this. This will be handled differently in the final/fourth command.
	context.subscriptions.push(disposable1);



	// COMMAND 2: sandbox.trackTimeTwoOptions
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// Upon activation, this command displays one pop-up at the bottom of the window with the local time.
	// Later it displays one pop-up (with two buttons) that repeats based on the duration of the runTime variable (set on line 25).
	let disposable2 = vscode.commands.registerCommand('sandbox.trackTimeTwoOptions', function () {

		// The code you place here will be executed every time this command is executed
		vscode.window.showInformationMessage(`You started this coding session at ${localTime}.`);

		// This code will execute repeatedly based on the timing of setInterval (runTime variable on line 111).
		// This is an async function to allow the response to await.
		setInterval(async() => {
			const endTime = new Date();

			// Convert the endTime to minutes and round the number.
			const timeMinutes = (endTime - startTime) / 1000 / 60;
			const roundedMinutes = Math.round(timeMinutes)

			// This pop-up creates a message with two buttons that are named based on the two strings listed after the first string. When a button is clicked or the pop-up is closed, an additional pop-up is displayed based on the 'if else' statement.
			// The "{ modal: true }" code creates the pop-up at the top of the window. This automatically creates an "OK" button in this pop-up.
			const response = await vscode.window.showInformationMessage(`You have been coding for ${roundedMinutes} minutes. Take 7 deep breaths`, 'Take break.', 'Keep coding.');
			
			if(response === 'Take break.') {
				vscode.window.showInformationMessage('Drink water.', { modal: true });
			} else if (response === 'Keep coding.') {
				vscode.window.showInformationMessage('Are you sure??');
			} else {
				vscode.window.showInformationMessage('You closed the message.');
			}

		// runTime is how often setInterval runs and displays the pop-ups inside.
		}, runTime)

	})

	// This is important. The "disposable2" variable created on line 40 needs to be pushed into this. This will be handled differently in the final/fourth command.
	context.subscriptions.push(disposable2);



	// COMMAND 3: sandbox.tryAgain
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// Upon activation, nothing is displayed.
	// Later it displays a pop-up (with two buttons) at the top of the window, and additional pop-ups display based on the user response ('if else' statement). This pop-up repeats based on the duration of the runTime variable (set on line 25).
	let disposable3 = vscode.commands.registerCommand('sandbox.tryAgain', function () {

		// This code will execute repeatedly based on the timing of setInterval (runTime variable on line 142).
		// This is an async function to allow the response to await.
		// The "{ modal: true }" code creates the pop-up at the top of the window. This automatically creates an "OK" button in the pop-up; or if additional buttons are manually created, a "Cancel" button is automatically created as well.
		setInterval( async () => {
			const answer = await vscode.window.showInformationMessage('Try again?', { modal: true }, 'Yes', 'No');

			if(answer === 'Yes') {
				vscode.window.showInformationMessage('You tried again!', { modal: true });
			} else if (answer === 'No') {
				vscode.window.showInformationMessage('No more trying.', { modal: true });
			} else {
				vscode.window.showInformationMessage('You closed the message.', { modal: true });
			}

		// runTime is how often setInterval runs and displays the pop-ups inside.
		}, runTime)
	});

	// This is important. The "disposable3" variable created on line 40 needs to be pushed into this. This will be handled differently in the final/fourth command.
	context.subscriptions.push(disposable3);



	// COMMAND 4: sandbox.goodbyeCheese
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// Upon activation, nothing is displayed.
	// Later it displays two pop-ups. One pop-up is at the top of the window ("{ modal: true }"), and the other pop-up is at the bottom of the window. The top pop-up is broken up into multiple lines ("\n"); this does not seem to work for the bottom pop-up. These pop-up repeat based on the duration of the runTime variable (set on line 25).
	//Additionally, this command places all the code directly inside the context.subscriptions.push(), so no variable needs to be pushed into it below.
	context.subscriptions.push(

		// The code you place here will be executed every time your command is executed
		vscode.commands.registerCommand('sandbox.goodbyeCheese', function () {
		
		// This code will execute repeatedly based on the timing of setInterval (runTime variable on line 169).
		// The "{ modal: true }" code is what creates the pop-up at the top of the window.
		// The "more cheese" and "Cancel" buttons don't do anything.
			setInterval(function() {
				vscode.window.showInformationMessage('Hello Cheese\nfrom\nsandbox!', { modal: true }, 'more cheese');
				vscode.window.showInformationMessage(`Goodbye Cheese\nfrom\nsandbox!`);

			// runTime is how often setInterval runs and displays the pop-ups inside.
			}, runTime)
		})
	);

}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}



// OLD PRE-BUILT COMMENTS
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed



// The commandId parameter must match the command field in package.json