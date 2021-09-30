import { FC } from 'react';
import 'antd/dist/antd.css';
import './css/App.css';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import Content from './components/Content';
import Footer from './components/Footer';
import { Layout } from 'antd';

const App: FC = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Breadcrumb />
        <div className="site-layout-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias dolores deserunt amet corporis, consequatur non suscipit pariatur earum porro repudiandae. Alias consequatur cum dicta, unde ratione quam tenetur necessitatibus expedita?
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem sapiente tempora sequi assumenda. Harum dolore ad obcaecati ab provident natus illo eius perspiciatis culpa repellendus odit, ipsa velit tempore rem.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt fugit, non expedita ea totam cumque illum laboriosam ducimus vero. Repudiandae vitae iusto possimus! Magni mollitia, sit cumque laboriosam rerum pariatur.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta nostrum illo consequatur error distinctio iure rem vel sint inventore quod, magni vero quo ab. Nostrum laborum dolorem fugit totam voluptas.
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default App;
