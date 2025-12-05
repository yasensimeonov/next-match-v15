'use client';

import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/table";
import {MessageDto} from "@/types";
import {Card} from "@heroui/card";
import MessageTableCell from "@/app/messages/MessageTableCell";
import {useMessages} from "@/hooks/useMessages";

type Props = {
    initialMessages: MessageDto[];
}

export default function MessageTable({initialMessages}: Props) {
    const {columns, isOutbox, isDeleting, deleteMessage, selectRow, messages} = useMessages(initialMessages);

    return (
        <Card className='flex flex-col gap-3 h-[80vh] overflow-auto'>
            <Table
                aria-label="Message Table"
                selectionMode="single"
                onRowAction={(key) => selectRow(key)}
                shadow='none'
            >
                <TableHeader columns={columns}>
                    {(column) =>
                        <TableColumn
                            key={column.key}
                            width={column.key === 'text' ? '50%' : undefined}
                        >
                            {column.label}
                        </TableColumn>}
                </TableHeader>
                <TableBody items={messages} emptyContent='No messages for this container'>
                    {(item) => (
                        <TableRow key={item.id} className='cursor-pointer'>
                            {(columnKey) => (
                                <TableCell className={`${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                                    {/*<div className={`${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}*/}
                                    {/*>*/}
                                    {/*    {getKeyValue(item, columnKey)}*/}
                                    {/*</div>*/}
                                    {/*{renderCell(item, columnKey as keyof MessageDto)}*/}
                                    <MessageTableCell
                                        item={item}
                                        columnKey={columnKey as string}
                                        isOutbox={isOutbox}
                                        deleteMessage={deleteMessage}
                                        isDeleting={isDeleting.loading && isDeleting.id === item.id}
                                    />
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    )
}