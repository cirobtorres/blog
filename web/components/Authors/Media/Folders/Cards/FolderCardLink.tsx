import { protectedWebUrls } from "../../../../../routing/routes";
import { FolderCardLinkIcon } from "./Buttons/FolderCardLinkIcon";
import FolderCardDeleteButton from "./Buttons/FolderCardDeleteButton";
import FolderCardEditButton from "./Buttons/FolderCardEditButton";
import FolderCardCheckbox from "./Buttons/FolderCardCheckbox";
import {
  FolderCardFloatingButtonsWrapper,
  FolderCardLinkWrapper,
} from "./FolderCardsUtils";

export default function FolderCard({ folder }: { folder: Folder }) {
  return (
    <FolderCardLinkWrapper folder={folder}>
      <FolderCardCheckbox folder={folder} />
      <FolderCardLinkIcon href={protectedWebUrls.media + "/" + folder.path} />
      <FolderCardFloatingButtonsWrapper>
        <FolderCardEditButton {...folder} />
        <FolderCardDeleteButton {...folder} />
      </FolderCardFloatingButtonsWrapper>
    </FolderCardLinkWrapper>
  );
}
