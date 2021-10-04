import { FC } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './static/css/App.scss';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import AllQuestions from './components/routes/AllQuestions';
import Registration from './components/routes/Registration';
import Login from './components/routes/Login';
import Profile from './components/routes/Profile';
import NewQuestion from './components/routes/NewQuestion';
import Question from './components/routes/Question';

const App: FC = () => {
  return (
    <Layout>
      <Router>
        <Header />
        <Content>
          <Route path="/" exact component={AllQuestions} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/new-question" component={NewQuestion} />
          <Route path="/question/:id" component={Question} />
        </Content>
        <Footer />
      </Router>
    </Layout>
  );
}

export default App;
