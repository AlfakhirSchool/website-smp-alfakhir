"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormData = {
  // Step 1
  "nama-lengkap": string;
  "no-handphone": string;
  "jenis-kelamin": string;
  "tanggal-lahir": string;
  "tempat-lahir": string;
  nik: string;
  nisn: string;
  // Step 2
  "nama-sekolah": string;
  "alamat-sekolah": string;
  "npsn-sekolah": string;
  // Step 3
  "alamat-lengkap": string;
  kota: string;
  provinsi: string;
  "kode-pos": string;
  // Step 4
  "nama-lengkap-orangtua": string;
  "no-handphone-orangtua": string;
  "nik-ayah": string;
  "nik-ibu": string;
  "pekerjaan-orangtua": string;
  "penghasilan-perbulan-orangtua": string;
  "payment-method": string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });
  const [step, setStep] = React.useState(1);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/register", data);
      toast.success("Registration successful!", { position: "top-right" });
      reset();
      setStep(1);
      setTimeout(() => {
        router.push("/proof-payment");
      }, 4000);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage, { position: "top-right" });
    }
  };

  const step1Fields: (keyof FormData)[] = [
    "nama-lengkap",
    "no-handphone",
    "jenis-kelamin",
    "tanggal-lahir",
    "tempat-lahir",
    "nik",
    "nisn",
  ];
  const step2Fields: (keyof FormData)[] = [
    "nama-sekolah",
    "alamat-sekolah",
    "npsn-sekolah",
  ];
  const step3Fields: (keyof FormData)[] = [
    "alamat-lengkap",
    "kota",
    "provinsi",
    "kode-pos",
  ];

  const nextStep = async () => {
    const fields =
      step === 1 ? step1Fields : step === 2 ? step2Fields : step3Fields;
    const isValid = await trigger(fields);
    if (!isValid) {
      toast.error("Silakan isi semua kolom yang diperlukan dengan benar.", {
        position: "top-right",
      });
      return;
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // Helper untuk membersihkan input selain angka
  const numericOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <div>
          <h1 className="mb-3">Peserta Didik</h1>
          <div className="row">
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Jhon Doe"
                  autoComplete="name"
                  {...register("nama-lengkap", {
                    required: "Nama lengkap harus diisi",
                  })}
                />
                {errors["nama-lengkap"] && (
                  <p className="text-danger">
                    {errors["nama-lengkap"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>No Handphone</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="628xxxxxxxx"
                  autoComplete="tel"
                  {...register("no-handphone", {
                    required: "No handphone harus diisi",
                    onChange: numericOnly, // HANYA ANGKA
                    pattern: {
                      value: /^628\d+$/,
                      message: "No handphone harus diawali dengan 628",
                    },
                  })}
                />
                {errors["no-handphone"] && (
                  <p className="text-danger">
                    {errors["no-handphone"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Jenis Kelamin</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Laki-laki"
                      id="laki-laki"
                      autoComplete="sex"
                      {...register("jenis-kelamin", {
                        required: "Jenis kelamin harus diisi",
                      })}
                    />
                    <label className="form-check-label" htmlFor="laki-laki">
                      Laki-laki
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Perempuan"
                      id="perempuan"
                      autoComplete="sex"
                      {...register("jenis-kelamin", {
                        required: "Jenis kelamin harus diisi",
                      })}
                    />
                    <label className="form-check-label" htmlFor="perempuan">
                      Perempuan
                    </label>
                  </div>
                </div>
                {errors["jenis-kelamin"] && (
                  <p className="text-danger">
                    {errors["jenis-kelamin"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Tanggal Lahir</label>
                <input
                  type="date"
                  placeholder="Tanggal Lahir"
                  autoComplete="bday"
                  {...register("tanggal-lahir", {
                    required: "Tanggal lahir harus diisi",
                  })}
                />
                {errors["tanggal-lahir"] && (
                  <p className="text-danger">
                    {errors["tanggal-lahir"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Tempat Lahir</label>
                <input
                  type="text"
                  placeholder="Jakarta"
                  autoComplete="address-level2"
                  {...register("tempat-lahir", {
                    required: "Tempat lahir harus diisi",
                  })}
                />
                {errors["tempat-lahir"] && (
                  <p className="text-danger">
                    {errors["tempat-lahir"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>NIK</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="321xxxxxxxxxxxx"
                  autoComplete="off"
                  {...register("nik", {
                    required: "NIK harus diisi",
                    onChange: numericOnly, // HANYA ANGKA
                    minLength: {
                      value: 16,
                      message: "NIK harus 16 digit",
                    },
                    maxLength: {
                      value: 16,
                      message: "NIK harus 16 digit",
                    },
                  })}
                />
                {errors["nik"] && (
                  <p className="text-danger">{errors["nik"].message}</p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>NISN</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="jika tidak punya isi 0"
                  autoComplete="off"
                  {...register("nisn", {
                    required: "NISN harus diisi",
                    onChange: numericOnly, // HANYA ANGKA
                    minLength: {
                      value: 0,
                      message: "NISN harus 10 digit",
                    },
                    maxLength: {
                      value: 10,
                      message: "NISN harus 10 digit",
                    },
                  })}
                />
                {errors["nisn"] && (
                  <p className="text-danger">{errors["nisn"].message}</p>
                )}
              </div>
            </div>
          </div>
          <button type="button" className="common_btn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="mb-3">Asal Sekolah</h1>
          <div className="row">
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Nama Sekolah</label>
                <input
                  type="text"
                  placeholder="Nama Sekolah Sebelumnya"
                  autoComplete="organization"
                  {...register("nama-sekolah", {
                    required: "Nama sekolah harus diisi",
                  })}
                />
                {errors["nama-sekolah"] && (
                  <p className="text-danger">
                    {errors["nama-sekolah"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Alamat Sekolah</label>
                <input
                  type="text"
                  placeholder="Alamat Sekolah Sebelumnya"
                  autoComplete="street-address"
                  {...register("alamat-sekolah", {
                    required: "Alamat sekolah harus diisi",
                  })}
                />
                {errors["alamat-sekolah"] && (
                  <p className="text-danger">
                    {errors["alamat-sekolah"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>NPSN Sekolah</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="jika tidak punya isi 0"
                  autoComplete="off"
                  {...register("npsn-sekolah", {
                    required: "NPSN sekolah harus diisi",
                    onChange: numericOnly, // HANYA ANGKA
                    minLength: {
                      value: 0,
                      message: "NPSN harus 8 digit",
                    },
                    maxLength: {
                      value: 8,
                      message: "NPSN harus 8 digit",
                    },
                  })}
                />
                {errors["npsn-sekolah"] && (
                  <p className="text-danger">
                    {errors["npsn-sekolah"].message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button type="button" className="common_btn mb-3" onClick={prevStep}>
            Back
          </button>
          <button type="button" className="common_btn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="mb-3">Alamat Peserta Didik</h1>
          <div className="row">
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Alamat Lengkap</label>
                <input
                  type="text"
                  placeholder="Jl. Merdeka No.123, RT 01 RW 02, Kelurahan ABC, Kecamatan DEF"
                  autoComplete="street-address"
                  {...register("alamat-lengkap", {
                    required: "Alamat lengkap harus diisi",
                  })}
                />
                {errors["alamat-lengkap"] && (
                  <p className="text-danger">
                    {errors["alamat-lengkap"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Kota</label>
                <input
                  type="text"
                  placeholder="Kota"
                  autoComplete="address-level2"
                  {...register("kota", { required: "Kota harus diisi" })}
                />
                {errors["kota"] && (
                  <p className="text-danger">{errors["kota"].message}</p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Provinsi</label>
                <input
                  type="text"
                  placeholder="Provinsi"
                  autoComplete="address-level1"
                  {...register("provinsi", {
                    required: "Provinsi harus diisi",
                  })}
                />
                {errors["provinsi"] && (
                  <p className="text-danger">{errors["provinsi"].message}</p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Kode Pos</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Kode Pos"
                  autoComplete="postal-code"
                  {...register("kode-pos", {
                    required: "Kode pos harus diisi",
                    onChange: numericOnly, // HANYA ANGKA
                    minLength: {
                      value: 5,
                      message: "Kode pos harus 5 digit",
                    },
                    maxLength: {
                      value: 5,
                      message: "Kode pos harus 5 digit",
                    },
                  })}
                />
                {errors["kode-pos"] && (
                  <p className="text-danger">{errors["kode-pos"].message}</p>
                )}
              </div>
            </div>
          </div>
          <button type="button" className="common_btn mb-3" onClick={prevStep}>
            Back
          </button>
          <button type="button" className="common_btn" onClick={nextStep}>
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h1 className="mb-3">Data Orang Tua</h1>
          <div className="row">
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Nama Lengkap Orang Tua</label>
                <input
                  type="text"
                  placeholder="Nama Lengkap Orang Tua"
                  autoComplete="section-parent name"
                  {...register("nama-lengkap-orangtua", {
                    required: "Nama lengkap orang tua harus diisi",
                  })}
                />
                {errors["nama-lengkap-orangtua"] && (
                  <p className="text-danger">
                    {errors["nama-lengkap-orangtua"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>No Handphone Orang Tua</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="628xxxxxxxx"
                  autoComplete="section-parent tel"
                  {...register("no-handphone-orangtua", {
                    required: "No handphone orang tua harus diisi",
                    onChange: numericOnly, // HANYA ANGKA
                    pattern: {
                      value: /^628\d+$/,
                      message: "No handphone harus diawali dengan 628",
                    },
                  })}
                />
                {errors["no-handphone-orangtua"] && (
                  <p className="text-danger">
                    {errors["no-handphone-orangtua"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>NIK Ayah</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="321xxxxxxxxxxxx"
                  autoComplete="off"
                  {...register("nik-ayah", {
                    required: "NIK Ayah harus diisi",
                    onChange: numericOnly, // HANYA ANGKA
                    minLength: {
                      value: 0,
                      message: "NIK harus 16 digit",
                    },
                    maxLength: {
                      value: 16,
                      message: "NIK harus 16 digit",
                    },
                  })}
                />
                {errors["nik-ayah"] && (
                  <p className="text-danger">{errors["nik-ayah"].message}</p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>NIK Ibu</label>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="123xxxxxxxxxxxx"
                  autoComplete="off"
                  {...register("nik-ibu", {
                    required: "NIK Ibu harus diisi",
                    onChange: numericOnly, // HANYA ANGKA
                    minLength: {
                      value: 0,
                      message: "NIK harus 16 digit",
                    },
                    maxLength: {
                      value: 16,
                      message: "NIK harus 16 digit",
                    },
                  })}
                />
                {errors["nik-ibu"] && (
                  <p className="text-danger">{errors["nik-ibu"].message}</p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Pekerjaan Orang Tua</label>
                <input
                  type="text"
                  placeholder="Bekerja Sebagai"
                  autoComplete="section-parent organization-title"
                  {...register("pekerjaan-orangtua", {
                    required: "Pekerjaan orang tua harus diisi",
                  })}
                />
                {errors["pekerjaan-orangtua"] && (
                  <p className="text-danger">
                    {errors["pekerjaan-orangtua"].message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Penghasilan Perbulan Orang Tua</label>
                <input
                  type="text"
                  placeholder="e.g Rp 7.000.000 > Rp 10.000.000"
                  autoComplete="off"
                  {...register("penghasilan-perbulan-orangtua", {
                    required: "Penghasilan perbulan orang tua harus diisi",
                  })}
                />
                {errors["penghasilan-perbulan-orangtua"] && (
                  <p className="text-danger">
                    {errors["penghasilan-perbulan-orangtua"].message}
                  </p>
                )}
              </div>
            </div>
            <h3 className="mb-3">Data Pembayaran</h3>
            <div className="col-xl-12">
              <div className="tf__login_imput">
                <label>Pembayaran Via</label>
                <select
                  {...register("payment-method", {
                    required: "Metode pembayaran harus dipilih",
                  })}
                  className="form-control"
                  style={{ width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
                >
                  <option value="">-- Pilih Metode Pembayaran --</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="Cash">Cash</option>
                </select>
                {errors["payment-method"] && (
                  <p className="text-danger">
                    {errors["payment-method"].message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button type="button" className="common_btn mb-3" onClick={prevStep}>
            Back
          </button>
          <button type="submit" className="common_btn">
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
