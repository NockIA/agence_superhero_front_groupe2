import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../../components/Nav/nav";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiKey, apiUrl } from "../../utils/api";
import AuthService from "../../services/auth_services";
import { HeroCardInterface } from "../../components/HeroCard/hero_card";
import "./edit_extras.css";

const EditExtras: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const _authService = new AuthService();
  const [extraDatas, setExtraDatas] = useState<HeroCardInterface | undefined>();
  const [nameCtrl, setNameCtrl] = useState<string>(extraDatas?.name || "");
  const [descrCtrl, setDescCtrl] = useState<string>(
    extraDatas?.description || ""
  );
  const [imgCtrl, setImgCtrl] = useState<string>();
  const getUrl = new URLSearchParams(location.search).get("getUrl");
  const putUrl = new URLSearchParams(location.search).get("putUrl");
  const delUrl = new URLSearchParams(location.search).get("delUrl");
  useEffect(() => {
    if (getUrl && putUrl) {
      axios
        .get(apiUrl + getUrl + "/" + id, {
          headers: {
            Authorization: "Bearer " + _authService.getCookie(),
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
          },
        })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setExtraDatas(response.data[0]);
          } else {
            setExtraDatas(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id, getUrl, location.pathname, putUrl]);

  const handleConfirm = () => {
    const datas = {
      id: extraDatas?.id,
      name: nameCtrl ? nameCtrl : extraDatas?.name,
      description: descrCtrl ? descrCtrl : extraDatas?.description,
      linkImage: imgCtrl ? imgCtrl : extraDatas?.linkImage,
      planetLocationId: extraDatas?.planetLocationId,
    };

    axios
      .put(apiUrl + putUrl, datas, {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleDelete = () => {
    axios
      .delete(apiUrl + delUrl + "/" + extraDatas?.id, {
        headers: {
          Authorization: "Bearer " + _authService.getCookie(),
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <>
      <NavigationBar />
      {extraDatas && (
        <main className=" container_edit_extra alignCenter">
          <img
            src={extraDatas?.linkImage || "/no_image.png"}
            alt="extra_ img"
          />
          <section className="columnContainer container_extra_panel">
            <h1>{extraDatas?.name ?? "Undefined"}</h1>
            <article className="columnContainer container_inputs">
              <div className="columnContainer">
                <h5>Name</h5>
                <input
                  className="input_edit_extras"
                  type="text"
                  value={nameCtrl}
                  placeholder={extraDatas?.name ?? "Name"}
                  onChange={(e) => setNameCtrl(e.target.value)}
                />
              </div>
              {extraDatas.description && (
                <div className="columnContainer">
                  <h5>Description</h5>
                  <input
                    className="input_edit_extras"
                    type="text"
                    value={descrCtrl}
                    placeholder={extraDatas?.description ?? "Description"}
                    onChange={(e) => setDescCtrl(e.target.value)}
                  />
                </div>
              )}
              {extraDatas.linkImage && (
                <div className="columnContainer">
                  <h5>Link image</h5>
                  <input
                    className="input_edit_extras"
                    type="text"
                    value={imgCtrl}
                    placeholder={extraDatas?.linkImage ?? "link image"}
                    onChange={(e) => setImgCtrl(e.target.value)}
                  />
                </div>
              )}
            </article>
            {extraDatas.canModificate && (
              <article className="rowContainer container_extras_btn">
                <button onClick={handleConfirm} className="btn_edit_extra">
                  Edit
                </button>
                <button onClick={handleDelete} className="btn_delete_extra">
                  Delete
                </button>
              </article>
            )}
          </section>
        </main>
      )}
    </>
  );
};

export default EditExtras;
