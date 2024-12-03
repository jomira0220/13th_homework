import Footer from "@/commons/layout/footer";
import Input from "@/components/commons/input";
import TextArea from "@/components/commons/textarea";
import Form from "@/components/commons/form";
import {
  ISolplaceLogsSchema,
  solplaceLogsSchema,
} from "@/app/solplace-logs/new/form.schema";
import { useInitialize } from "@/app/solplace-logs/new/form.initialize";
import ImageUpload from "@/components/solplace-logs/image-upload";
import AddressInput from "@/components/solplace-logs/address-input";
import { Header } from "@/commons/layout/header";

export default function SolPlaceEditPage() {
  return (
    <>
      <Header />
      <Form<ISolplaceLogsSchema>
        schema={solplaceLogsSchema}
        useInitialize={useInitialize}
      >
        <div className="p-[1.25rem_1.25rem_0]">
          <div className="flex flex-col gap-5">
            <ImageUpload name="images" />
            <Input
              type="text"
              keyname="name"
              title="플레이스 이름"
              placeholder="플레이스 이름을 입력해 주세요"
              required
            />

            <AddressInput />

            <TextArea
              keyname="contents"
              title="플레이스 내용"
              required
              placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
            />
          </div>
        </div>
      </Form>
      <Footer>
        <button className="w-full h-12 font-bold bg-[var(--primary)] text-white text-lg leading-[1.5rem] rounded-lg disabled:bg-gray-300 disabled:text-gray-100">
          로그 등록
        </button>
      </Footer>
    </>
  );
}
