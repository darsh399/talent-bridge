import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserData } from "../../redux/reducers/userActions";

const CreateUserData = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [section, setSection] = useState({
    twelth: false,
    diploma: false,
    experience: true,
  });

  const [formData, setFormData] = useState({
    tenth: { schoolName: "", percentage: "", yearOfPassing: "" },
    twelfth: { collegeName: "", percentage: "", yearOfPassing: "" },
    diploma: { collegeName: "", percentage: "", yearOfPassing: "" },
    graduation: { collegeName: "", percentage: "", degree: "", yearOfPassing: "" },
    experience: { isFresher: true, companies: [] }, 
  });

  const inputHandler = (sectionName, e) => {
    setFormData((prev) => ({
      ...prev,
      [sectionName]: { ...prev[sectionName], [e.target.name]: e.target.value },
    }));
  };

  const handleCompanyChange = (index, field, value) => {
    const companies = [...formData.experience.companies];
    companies[index] = { ...companies[index], [field]: value };
    setFormData((prev) => ({ ...prev, experience: { ...prev.experience, companies } }));
  };

  const addCompany = () => {
    setFormData((prev) => ({
      ...prev,
      experience: {
        ...prev.experience,
        companies: [...prev.experience.companies, { companyName: "", role: "", yearWorked: "" }],
      },
    }));
  };

  const removeCompany = (index) => {
    const companies = [...formData.experience.companies];
    companies.splice(index, 1);
    setFormData((prev) => ({ ...prev, experience: { ...prev.experience, companies } }));
  };

  const safeNumber = (val) => (val ? Number(val) : 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      tenth: {
        schoolName: formData.tenth.schoolName || "NA",
        percentage: safeNumber(formData.tenth.percentage),
        yearOfPassing: safeNumber(formData.tenth.yearOfPassing),
      },
      graduation: {
        collegeName: formData.graduation.collegeName || "NA",
        percentage: safeNumber(formData.graduation.percentage),
        degree: formData.graduation.degree || "",
        yearOfPassing: safeNumber(formData.graduation.yearOfPassing),
      },
      experience: {
        isFresher: formData.experience.isFresher,
        years: safeNumber(formData.experience.years),
        companies: formData.experience.companies.map(c => ({
          companyName: c.companyName || "",
          role: c.role || "",
          yearWorked: safeNumber(c.yearWorked)
        }))
      }
    };

    if (section.twelth) {
      dataToSend.twelfth = {
        collegeName: formData.twelfth.collegeName || "NA",
        percentage: safeNumber(formData.twelfth.percentage),
        yearOfPassing: safeNumber(formData.twelfth.yearOfPassing),
      };
    }

    if (section.diploma) {
      dataToSend.diploma = {
        collegeName: formData.diploma.collegeName || "NA",
        percentage: safeNumber(formData.diploma.percentage),
        yearOfPassing: safeNumber(formData.diploma.yearOfPassing),
      };
    }

    console.log("Form Data sent to backend:", dataToSend);
    dispatch(createUserData(id, dataToSend));
  };

  return (
    <div className="profile-page">
      <div className="form-container">
        <h2>Create User Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* 10th */}
          <fieldset>
            <legend>10th Standard</legend>
            <input type="text" name="schoolName" placeholder="School Name" value={formData.tenth.schoolName} onChange={e => inputHandler("tenth", e)} required/>
            <input type="number" name="percentage" placeholder="Percentage" value={formData.tenth.percentage} onChange={e => inputHandler("tenth", e)} required/>
            <input type="number" name="yearOfPassing" placeholder="Year of Passing" value={formData.tenth.yearOfPassing} onChange={e => inputHandler("tenth", e)} />
          </fieldset>

          {/* 12th */}
          <label>
            <input type="checkbox" checked={section.twelth} onChange={() => setSection(prev => ({ ...prev, twelth: !prev.twelth }))} /> Add 12th
          </label>
          {section.twelth && (
            <fieldset>
              <legend>12th Standard</legend>
              <input type="text" name="collegeName" placeholder="College Name" value={formData.twelfth.collegeName} onChange={e => inputHandler("twelfth", e)} />
              <input type="number" name="percentage" placeholder="Percentage" value={formData.twelfth.percentage} onChange={e => inputHandler("twelfth", e)} />
              <input type="number" name="yearOfPassing" placeholder="Year of Passing" value={formData.twelfth.yearOfPassing} onChange={e => inputHandler("twelfth", e)} />
            </fieldset>
          )}

          {/* Diploma */}
          <label>
            <input type="checkbox" checked={section.diploma} onChange={() => setSection(prev => ({ ...prev, diploma: !prev.diploma }))} /> Add Diploma
          </label>
          {section.diploma && (
            <fieldset>
              <legend>Diploma</legend>
              <input type="text" name="collegeName" placeholder="College Name" value={formData.diploma.collegeName} onChange={e => inputHandler("diploma", e)} />
              <input type="number" name="percentage" placeholder="Percentage" value={formData.diploma.percentage} onChange={e => inputHandler("diploma", e)} />
              <input type="number" name="yearOfPassing" placeholder="Year of Passing" value={formData.diploma.yearOfPassing} onChange={e => inputHandler("diploma", e)} />
            </fieldset>
          )}

          {/* Graduation */}
          <fieldset>
            <legend>Graduation</legend>
            <input type="text" name="collegeName" placeholder="College Name" value={formData.graduation.collegeName} onChange={e => inputHandler("graduation", e)} required/>
            <input type="number" name="percentage" placeholder="Percentage" value={formData.graduation.percentage} onChange={e => inputHandler("graduation", e)} required/>
            <input type="text" name="degree" placeholder="Degree" value={formData.graduation.degree} onChange={e => inputHandler("graduation", e)} />
            <input type="number" name="yearOfPassing" placeholder="Year of Passing" value={formData.graduation.yearOfPassing} onChange={e => inputHandler("graduation", e)} />
          </fieldset>

          {/* Experience */}
          <fieldset>
            <legend>Experience</legend>
            <label>
              <input type="checkbox" checked={formData.experience.isFresher} onChange={e => setFormData(prev => ({ ...prev, experience: { ...prev.experience, isFresher: e.target.checked } }))} /> Fresher
            </label>
            {!formData.experience.isFresher && (
              <>
                <input type="number" name="years" placeholder="Years of Experience" value={formData.experience.years} onChange={e => setFormData(prev => ({ ...prev, experience: { ...prev.experience, years: e.target.value } }))} />
                {formData.experience.companies.map((c, i) => (
                  <div key={i}>
                    <input type="text" placeholder="Company Name" value={c.companyName} onChange={e => handleCompanyChange(i, 'companyName', e.target.value)} />
                    <input type="text" placeholder="Role" value={c.role} onChange={e => handleCompanyChange(i, 'role', e.target.value)} />
                    <input type="number" placeholder="Year Worked" value={c.yearWorked} onChange={e => handleCompanyChange(i, 'yearWorked', e.target.value)} />
                    <button type="button" onClick={() => removeCompany(i)}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={addCompany}>Add Company</button>
              </>
            )}
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserData;
