import HomeHeader from "./HomeHeader";
import { Typography, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function Introduce() {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (
    <Box>
      <HomeHeader />
      <Box
        sx={{
          backgroundImage: "url(/images/벽지1.jpg)",
          backgroundSize: "cover",
          height: "250px",
          marginTop: "65px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "white", fontSize: "2.4rem" }}>
          KHUperCLOUD를 이용해야 하는 이유
        </h1>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        <Typography variant="h3" sx={{ alignItems: "flex-start" }}>
          1.자체적 기능
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="images/중복이미지삭제.png"
            sx={{
              width: 150,
              height: 150,
              boxShadow: "0px 0px 10px 40px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Typography
            sx={{ marginTop: "60px" }}
            component="span"
            display="inline"
            variant="h5"
          >
            중복이미지삭제
          </Typography>
          <Typography
            sx={{ marginTop: "5px" }}
            component="span"
            display="inline"
            variant="body1"
          >
            중복된 이미지를 자동으로
            <br />
            삭제하여 저장공간을 절약하세요.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="images/문서번역.png"
            sx={{
              width: 150,
              height: 150,
              boxShadow: "0px 0px 10px 40px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Typography
            sx={{ marginTop: "58px" }}
            component="span"
            display="inline"
            variant="h5"
          >
            문서 번역
          </Typography>
          <Typography
            sx={{ marginTop: "5px" }}
            component="span"
            display="inline"
            variant="body1"
          >
            번역하는 수고를 덜어주고,
            <br />더 넓은 세상을 만나세요.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src="images/파일접근권한.png"
            sx={{
              width: 150,
              height: 150,
              boxShadow: "0px 0px 10px 40px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Typography
            sx={{ marginTop: "58px" }}
            component="span"
            display="inline"
            variant="h5"
          >
            파일 접근 권한
          </Typography>
          <Typography
            sx={{ marginTop: "5px" }}
            component="span"
            display="inline"
            variant="body1"
          >
            보안성 높은 파일 관리로
            <br />
            비즈니스를 안전하게 보호하세요.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: "200px" }}>
        <Typography variant="h3" sx={{ marginRight: 115, marginBottom: "5px" }}>
          2.AWS 연계
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "0px",
          justifyContent: "flex-start",
        }}
      >
        <img src="images/AWS.png" style={{ marginRight: "10px" }} />
        <div>
          <Typography sx={{ fontSize: 35 }}>안정성</Typography>
          <ul>
            <li>
              AWS는 전 세계적으로 막대한 인프라를 보유하고 있어, 빠르고 안정적인
              서비스를 제공합니다. 이는 웹 스토리지 서비스를 이용하는
              사용자들에게 높은 수준의 안정성을 제공합니다.
            </li>
          </ul>
          <Typography sx={{ fontSize: 35 }}>속도</Typography>
          <ul>
            <li>
              AWS는 빠른 속도로 데이터를 전송하고 저장할 수 있습니다. 이는 웹
              스토리지 서비스를 이용하는 사용자들에게 빠른 데이터 전송 및 빠른
              데이터 접근 속도를 제공합니다.
            </li>
          </ul>

          <Typography sx={{ fontSize: 35 }}>보안</Typography>
          <ul>
            <li>
              AWS는 높은 보안 수준을 유지하며 데이터 보호를 위해 다양한 보안
              기술을 적용합니다. 이는 웹 스토리지 서비스를 이용하는 사용자들에게
              높은 보안 수준을 제공합니다.
            </li>
          </ul>
        </div>
      </Box>
      <Typography style={{ color: "white", fontSize: "2.4rem" }}>
        KHUperCLOUD를 이용해야 하는 이유
      </Typography>
      <Box
        sx={{
         
          marginTop: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ fontSize: "2.4rem" }}>CREATED BY</h1>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Box sx={{ padding: "1rem", margin: "0 auto" }}>
            <Avatar
              sx={{
                fontSize: 50,
                width: 100,
                height: 100,
                bgcolor: stringToColor("Tae Hyun"),
              }}
            >
              TH
            </Avatar>
            <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
              컴퓨터공학과
              <br />
              공태현
            </div>
          </Box>
          <Box sx={{ padding: "1rem", margin: "0 auto" }}>
            <Avatar
              sx={{
                marginLeft: "20px" ,
                fontSize: 50,
                width: 100,
                height: 100,
                bgcolor: stringToColor("Seong Yeon"),
              }}
            >
              SY
            </Avatar>
            <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
              소프트웨어융합학과
              <br />
              차성연
            </div>
          </Box>
          <Box sx={{ padding: "1rem", margin: "0 auto" }}>
            <Avatar
              sx={{
                fontSize: 50,
                width: 100,
                height: 100,
                bgcolor: stringToColor("Ga Won"),
              }}
            >
              GW
            </Avatar>
            <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
              컴퓨터공학과
              <br />
              이가원
            </div>
          </Box>
          <Box sx={{ padding: "1rem", margin: "0 auto" }}>
            <Avatar
              sx={{
                fontSize: 50,
                width: 100,
                height: 100,
                bgcolor: stringToColor("Na Ri"),
              }}
            >
              NR
            </Avatar>
            <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
              컴퓨터공학과
              <br />
              박나리
            </div>
          </Box>
          <Box sx={{ padding: "1rem", margin: "0 auto" }}>
            <Avatar
              sx={{
                marginLeft: "20px",
                fontSize: 50,
                width: 100,
                height: 100,
                bgcolor: stringToColor("Jeong Won"),
              }}
            >
              JW
            </Avatar>
            <div style={{ marginTop: "0.5rem", textAlign: "center" }}>
              소프트웨어융합학과
              <br />
              이정원
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
