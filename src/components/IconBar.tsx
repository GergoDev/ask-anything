import { FC, MouseEventHandler } from 'react';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

interface IconBarProps {
    className: string,
    editHandler?: MouseEventHandler<HTMLSpanElement>,
    deleteHandler: MouseEventHandler<HTMLSpanElement>,
}

const IconBar: FC<IconBarProps> = ({className, editHandler, deleteHandler}) => (
    <div className={`icon-bar ${className}`}>
        {editHandler && <EditFilled onClick={editHandler} />}
        <DeleteFilled onClick={deleteHandler} />
    </div>
)

export default IconBar;