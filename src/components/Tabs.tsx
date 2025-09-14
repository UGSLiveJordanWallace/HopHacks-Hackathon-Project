export default function TabBar({
    tabItems,
    currTabItem,
    setTabItem,
}: {
    tabItems: string[];
    currTabItem: number;
    setTabItem: React.Dispatch<React.SetStateAction<number>>;
}) {
    return (
        <div className="flex flex-row w-full justify-center items-center gap-4 p-2 bg-slate-100">
            {tabItems.map((val, key) => {
                return (
                    <button
                        onClick={() => setTabItem(key)}
                        className={
                            "block p-3 " +
                            (currTabItem === key
                                ? "bg-white rounded-md font-bold shadow-sm"
                                : "bg-transparent text-stone-300")
                        }
                        key={key}
                    >
                        {val}
                    </button>
                );
            })}
        </div>
    );
}
