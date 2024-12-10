import Footer from "@/commons/layout/footer";
import Input from "@/components/commons/input";
import TextArea from "@/components/commons/textarea";
import Form from "@/components/commons/form";
import {
  ISolplaceLogsSchema,
  solplaceLogsSchema,
} from "@/commons/schema/solplace-logs/form.schema";

import ImageUpload from "@/components/solplace-logs/image-upload";
import AddressInput from "@/components/solplace-logs/address-input";
import SolplaceLogsMap from "@/components/solplace-logs/edit-new-map";
import ButtonBase from "@/components/commons/button";
import { useFormDefault } from "@/commons/hooks/use-form-default";
export default function SolPlaceNewPage() {
  return (
    <>
      <SolplaceLogsMap />

      <Form<ISolplaceLogsSchema>
        schema={solplaceLogsSchema}
        methodsSet={useFormDefault}
        className="w-full h-[calc(100vh-4rem)] flex flex-col"
      >
        <div className="p-[1.25rem_1.25rem_0]">
          <div className="flex flex-col gap-5">
            <ImageUpload name="images" />
            <Input
              type="text"
              name="title"
              title="플레이스 이름"
              placeholder="플레이스 이름을 입력해 주세요"
              required
            />

            <AddressInput />

            <TextArea
              name="contents"
              title="플레이스 내용"
              required
              placeholder="플레이스 내용을 입력해 주세요. (1자 이상)"
            />
          </div>
        </div>
        <Footer>
          <ButtonBase className="button-primary disabled:button-primary-off">
            로그 등록
          </ButtonBase>
        </Footer>
      </Form>
    </>
  );
}
