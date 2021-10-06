import { FC, MouseEventHandler } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface IconBarProps {
    className: string,
    editHandler?: MouseEventHandler<HTMLSpanElement>,
    deleteHandler: MouseEventHandler<HTMLSpanElement>,
}

const IconBar: FC<IconBarProps> = ({className, editHandler, deleteHandler}) => (
    <div className={`icon-bar ${className}`}>
        {editHandler && <EditOutlined onClick={editHandler} />}
        <DeleteOutlined onClick={deleteHandler} />
    </div>
)

export default IconBar;