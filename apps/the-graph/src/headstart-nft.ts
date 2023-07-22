import {
  ProfileCreated as ProfileCreated,
  Transfer as TransferEvent,
} from "../generated/HeadstartNFT/HeadstartNFT";
import { Profile } from "../generated/schema";

export function handleProfileCreated(event: ProfileCreated): void {
  let entity = new Profile(event.params.tokenId.toString());

  entity.accountAddress = event.params.account;
  entity.ownedBy = event.address;
  entity.tokenId = event.params.tokenId;
  entity.handle = event.params.handle;
  entity.profileId = event.params.profileId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = Profile.load(event.params.tokenId.toString());

  if (entity) {
    entity.ownedBy = event.params.to;
    entity.save();
  }
}
