import { Avatar, FormControl, TextField } from "@mui/material";
import Icon from "../../Icon";
import IconButton from "../../IconButton";
import { useEffect, useState } from "react";
import { IEmployee } from "@/models/Employee";
import useLoadingAnimation from "@/hooks/useLoadingAnimation";
import employeeAPI from "@/apis/employee";
import useAlert from "@/hooks/useAlert";

export default function PopupAddSupervisor({
    selectedSupervisorId,
    onChangeSupervisor,
}: {
    selectedSupervisorId?: number;
    onChangeSupervisor: (approver?: IEmployee) => void;
}) {
    const [laborList, setLaborList] = useState<IEmployee[]>([]);
    const setLoading = useLoadingAnimation();
    const setAlert = useAlert();

    const filteredListLabors : {
        id: string;
        firstName: string;
        lastName: string;
    }[] = [];
    const selectedSupervision = laborList.find(labor => labor.employeeid == selectedSupervisorId);

    const onUnselectSupervisor = () => {
        onChangeSupervisor(undefined);
    }

    useEffect(() => {
        fetchLaborList();
    }, []);

    async function fetchLaborList() {
        setLoading(true);
        
        try {
            const laborResponse = await employeeAPI.getList();
            setLaborList(laborResponse);
        }
        catch (ex) {
            setAlert({
                message: "Xảy ra lỗi khi lấy dữ liệu Nhân công!",
                severity: "error"
            })
        }
        finally {
            setLoading(true);
        }
    }

    return (
        <div className="min-w-[800px] h-[520px] flex flex-col bg-white rounded-2xl overflow-hidden">
            <header className="flex-shrink-0 h-16 px-6 flex gap-6 items-center border-b  ">
                <Icon className="text-apple-gray" name="magnifying-glass" size="xl" />
                <FormControl fullWidth>
                    <TextField
                        className=""
                        variant="standard"
                        placeholder="Nhập ID Nhân viên hoặc tên Nhân viên..."
                    />
                </FormControl>
            </header>
            {selectedSupervision &&
                <section className="flex-shrink-0 h-36 p-5 pt-2 flex flex-col justify-between border-b-2 shadow-sm">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Người giám sát đã chọn</p>
                        <IconButton onClick={onUnselectSupervisor} name="user-xmark" tooltip="Bỏ chọn người giám sát" />
                    </div>
                    <div className="grid grid-cols-3 items-center justify-items-start rounded-md">
                        <Avatar>{selectedSupervision.firstname?.[0]}</Avatar>
                        <span>{selectedSupervision.employeeid}</span>
                        <span>{selectedSupervision.firstname + " " + selectedSupervision.lastname}</span>
                    </div>
                </section>
            }
            <main className="relative flex-grow p-2 flex flex-col gap-2 overflow-auto ">
            { laborList.length ? 
                laborList.map(labor => (
                    <button
                        key={labor.employeeid}
                        className="flex-shrink-0 h-20 px-3 grid grid-cols-3 items-center justify-items-start hover:bg-apple-gray-6 cursor-pointer rounded-md"
                        onClick={() => {
                            onChangeSupervisor(labor)
                        }}
                    >
                        <Avatar>{labor.lastname?.[0]}</Avatar>
                        <span>{labor.employeeid}</span>
                        <span>{labor.firstname + " " + labor.lastname}</span>
                    </button>) 
                ) :
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 text-apple-gray">Không có kết quả tìm kiếm phù hợp</p>
            }  
            </main>
            <footer className="flex-shrink-0 h-10 border-t ">

            </footer>
        </div>
    )
}