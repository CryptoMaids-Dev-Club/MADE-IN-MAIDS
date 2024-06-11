import Image from "next/image";
import { Trans } from "react-i18next/TransWithoutContext";
import { FadeInBottom } from "@/app/[lang]/_components/Elements/FadeInButton";
import { LinkText } from "@/app/[lang]/_components/Elements/LinkText";
import { getTranslation } from "@/app/i18n/server";
import { Typography } from "@/components/ui/typography";

const HowToGetTicket = async ({ lang }: { lang: string }) => {
	const { t } = await getTranslation(lang);
	return (
		<div className="pb-12">
			<FadeInBottom>
				<div className="my-4 grid grid-cols-1 items-center gap-2 md:grid-cols-5">
					<div className="col-span-2 flex items-center justify-center">
						<Image
							src="/images/staking.png"
							alt="medal"
							width={500}
							height={500}
						/>
					</div>
					<div className="md:col-span-3 md:ml-8">
						<Typography variant="h2" className="text-2xl md:text-3xl">
							<Trans i18nKey="lottery:howToGetTicket1" t={t} />
						</Typography>
						<Typography
							variant="lead"
							className="text-base md:text-xl [&_span]:inline-block"
						>
							<Trans
								i18nKey="lottery:howToGetTicket1Detail"
								t={t}
								components={{
									lnk: (
										<LinkText
											href="https://made-in-maids.cryptomaids.tokyo/"
											className="text-yellow-300 underline"
										/>
									),
								}}
							></Trans>
						</Typography>
					</div>
				</div>
			</FadeInBottom>

			<FadeInBottom>
				<div className="my-4 grid grid-cols-1 items-center justify-center gap-4 md:grid-cols-5">
					<div className="col-span-2 flex items-center justify-center">
						<Image src="/images/mogm.png" alt="mogm" width={500} height={500} />
					</div>
					<div className="md:col-span-3 md:ml-8">
						<Typography variant="h3" className="text-2xl md:text-3xl">
							{t("lottery:howToGetTicket2")}
						</Typography>
						<Typography variant="lead" className="text-base md:text-xl">
							<Trans
								i18nKey="lottery:howToGetTicket2Detail"
								t={t}
								components={{
									lnk: (
										<LinkText
											href="/market"
											className="text-yellow-300 underline"
										/>
									),
								}}
							></Trans>
						</Typography>
					</div>
				</div>
			</FadeInBottom>
		</div>
	);
};

export default HowToGetTicket;
