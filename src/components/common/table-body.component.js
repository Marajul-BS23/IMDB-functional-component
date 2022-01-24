const TableBody = ({ data, columns }) => {
    console.log(data);
    return (
        <>
            <tbody>
                {data.map((row) => {
                    return (
                        <tr>
                            {columns.map((col) => {
                                return col.content(row, col.path);
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </>
    );
};

export default TableBody;
