import QuestionObj from '../../src/models/question';
import QuestionHeader from '../../src/components/Main/questionPage/header';
import OrderButton from '../../src/components/Main/questionPage/header/orderButton';
import Question from '../../src/components/Main/questionPage/question';
import Answer from '../../src/models/answer';
import QuestionPage from '../../src/components/Main/questionPage'

// Question Page - Order Button
it('Rendering Order Button', () => {
    const message = 'Test Message'
    const setQuestionOrder = (message) => console.log(message)
    cy.window().then((win) => {
        cy.spy(win.console, 'log').as('consoleLogSpy');
    });  
    
    cy.mount(<OrderButton 
        message={message} 
        setQuestionOrder={setQuestionOrder}/>)
     cy.get('.btn').contains(message)

})

// Question Page - Header Component
it('Rendering Question Header', () => {
    const title = 'Sample Title'
    const count = 1
    const newQuestionButton = 'Add a new question'
    const handleNewQuestion = () => console.log(newQuestionButton)
    const setQuestionOrder = (message) => console.log(message)
    cy.window().then((win) => {
        cy.spy(win.console, 'log').as('consoleLogSpy');
    });  
    
    cy.mount(<QuestionHeader 
        title_text={title} 
        qcnt = {count}
        setQuestionOrder={setQuestionOrder}
        handleNewQuestion={handleNewQuestion}/>)

    cy.get('.bold_title').contains(title)
    cy.get('.bluebtn').click()
    cy.get('@consoleLogSpy').should('have.been.called');
    cy.get('@consoleLogSpy').then(consoleLogSpy => {
      expect(consoleLogSpy).to.have.been.calledWith(newQuestionButton);
    });
    cy.get('#question_count').contains(count + ' questions')
    cy.get('.btns').eq(0).should('have.text', 'NewestActiveUnanswered');
})

// Question Body
it('Rendering Question Body', () => {
    const answers = []
    for(var index= 1; index <= 2; index++){
        var newanswer = {
            aid: index,
            text: 'Sample Answer Text '+index,
            ansBy: 'sampleanswereduser'+index,
            ansDate: new Date(),
        };
        answers.push(new Answer(newanswer))
    }
    let question = {
        title: 'Sample Question Title',
        text: 'Sample Question Text',
        askedBy: 'vanshitatilwani',
        askDate: new Date(),
        views : 150,
        ansIds : answers.map(answer => answer.aid),
        tagIds: [1,2]

    };

    const getTagById = (tid) => { return {name :'Sample Tag ' + tid}};
    const clickTag = (name) => console.log('Tag Clicked : '+name)
    const handleAnswer = (qid) => console.log('handleAnswer Clicked');
    
    cy.window().then((win) => {
        cy.spy(win.console, 'log').as('consoleLogSpy');
    });  
    
    cy.mount(<Question 
        q={new QuestionObj(question)} 
        getTagById = {getTagById}
        clickTag={clickTag}
        handleAnswer={handleAnswer}/>)

    cy.get('.postTitle').contains(question.title)
    cy.get('.postStats').contains(answers.length + ' answers')
    cy.get('.postStats').contains(question.views + ' views')
    cy.get('.question_tag_button').contains('Sample Tag 1')
    cy.get('.question_tag_button').contains('Sample Tag 2')
    cy.get('.question_author').contains(question.askedBy)
})

// Rendering Main Question Page
it('Rendering Main Question Page', () => {
    const questions = []
    for(var index= 1; index <= 2; index++){
        var question = {
            title: 'Sample Question Title ' + index,
            text: 'Sample Question Text '+index,
            askedBy: 'sampleusername' + index,
            askDate: new Date(),
            views : index,
            ansIds : [1,2],
            tagIds :[1,2]
        };
        questions.push(new QuestionObj(question))
    }
    const newQuestionButton = 'Add a new question'
    const getTagById = (tid) => { return {name :'Sample Tag ' + tid}};
    const clickTag = (name) => console.log('Tag Clicked : '+name)
    const handleAnswer = (qid) => console.log('handleAnswer Clicked');
    const setQuestionOrder = (message) => console.log(message)
    const handleNewQuestion = () => console.log(newQuestionButton)

    cy.window().then((win) => {
        cy.spy(win.console, 'log').as('consoleLogSpy');
    });  
    
    cy.mount(<QuestionPage 
        qlist={questions}
        getTagById = {getTagById}
        setQuestionOrder={setQuestionOrder}
        clickTag={clickTag}
        handleAnswer={handleAnswer}
        handleNewQuestion={handleNewQuestion}/>)

    cy.get('.bold_title').contains('All Questions')
    cy.get('.bluebtn').click()
    cy.get('@consoleLogSpy').should('have.been.called');
    cy.get('@consoleLogSpy').then(consoleLogSpy => {
      expect(consoleLogSpy).to.have.been.calledWith(newQuestionButton);
    });
    cy.get('#question_count').contains(questions.length + ' questions')
    cy.get('.btns').eq(0).should('have.text', 'NewestActiveUnanswered');
    for(var index = 0; index < questions.length; index++) {
        cy.get('.postTitle').eq(index).contains(questions[index].title)
        cy.get('.postStats').eq(index).contains(questions[index].ansIds.length + ' answers')
        cy.get('.postStats').eq(index).contains(questions[index].views+' views')
        cy.get('.question_author').contains(questions[index].askedBy)
    }
    
})