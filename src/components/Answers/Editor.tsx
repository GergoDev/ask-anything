import { ChangeEventHandler, MouseEventHandler } from 'react';
import { Form, Button, Input } from 'antd';

const { TextArea } = Input;

type editorPropTypes = {
    onChange: ChangeEventHandler<HTMLTextAreaElement>,
    onSubmit: MouseEventHandler<HTMLElement>,
    submitting: boolean,
    value: string
  }
  
  const Editor = ({ onChange, onSubmit, submitting, value }: editorPropTypes) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Answer
        </Button>
      </Form.Item>
    </>
  );

  export default Editor;