const prompt = require('prompt-sync')();
const log = console.log

makeNode = (subject, message) => {
    return {
        subject: subject,
        message: message,
        next: null
    }
}

class Inbox {
    constructor() {
        this.head = null
        this.tail = null
    }

    add(subject, message) {
        let node = makeNode(subject, message)

        if (!this.tail) {
            this.head = this.tail = node
            return node
        }

        this.tail.next = node
        this.tail = node
    }

    find(answer) {
        let node = this.head
        while(node) {
            if (node.subject === answer) {
                return node.message
            } else {
                return "Too bad, Charlie"
            }
            node = node.next
        }
    }

    print(node) {
        if(node) {
            log(`Subject: ${node.subject}`)
            log(`Message: ${node.message}`)
        } else {
            return
        }
        this.print(node.next)
    }
}

let myEmails = new Inbox()
myEmails.add("Groceries", "Milk, eggs, butter")
myEmails.add("A message", "Buy some balloons")

keepLoop = true

while (keepLoop == true) {
    log("Welcome to Message Leaver 5000! \n Would you like to (S)ave a message, (R)etrieve a message, (V)iew all messages, or (E)xit?")
    answer = prompt("> ").toLowerCase();
    log(answer)

    if (answer =="e") {
        log("Thanks for using Message Leaver 5000!")
        keepLoop = false
    }
    
    if (answer == "s") {
        log("Please enter the subject line:")
        subAnswer = prompt("> ")
        log("Please enter the message body:")
        mesAnswer = prompt("> ")
        myEmails.add(subAnswer, mesAnswer)
    }

    if (answer == "v") {
        log("You've got mail!")
        myEmails.print(myEmails.head)
    }

    if (answer == "r") {
        log("What is the subject of the message you would like to retrieve?")
        answer = prompt("> ")
        
        log(`Your message was: \n ${myEmails.find(answer)}`)
    }
}
