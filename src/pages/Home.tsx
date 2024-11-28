import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { setUserData } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface User {
    fullName: string;
    avatarLink: string;
}



const Home: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    useEffect(() => {
        try {
            const getUserData = async () => {
                const userId = localStorage.getItem("userToken");
                const response = await fetch(`${import.meta.env.VITE_API}/user/singleUser/${userId}`, {
                    method: "GET",
                });
                const data = await response.json();
                if (data.message === "Token Expired!") {
                    navigate("/signin");
                } else {
                    setUser(data.user[0])
                    dispatch(setUserData(data.user[0]))
                }
                setLoading(false);
            };
            getUserData();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [dispatch, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userToken");
        navigate("/signin");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Home</h1>
            <Avatar>
                <AvatarImage src={user?.avatarLink} alt={user?.fullName}     referrerPolicy="no-referrer"  />
                <AvatarFallback>{user?.fullName?.[0] || "?"}</AvatarFallback>
            </Avatar>
            Hi {user?.fullName}
            <br />
            <br />
            <Button onClick={handleLogout}>Log out</Button>
            <br />
            <br />
            <Link to="/test">
                <Button>Post</Button>
            </Link>
        </div>
    );
};

export default Home;
